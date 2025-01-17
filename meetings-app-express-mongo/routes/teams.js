// Handles /api/teams/...

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = mongoose.model('User');
const Team = mongoose.model('Team');

const { authenticate } = require('../utils/auth');

/*
    *** Sample queries ***
    http://localhost:3000/api/teams
*/
router.get( '/', authenticate );
router.get( '/', function (req, res, next) {
    const userId = res.locals.claims.userId;
    const email = res.locals.claims.email;

    const filter = { members: { $elemMatch: { } } };

    if( userId ) {
        filter.members.$elemMatch.userId = userId;
    }
    
    if( email ) {
        filter.members.$elemMatch.email = email;
    }

    Team
        .find( filter )
        .exec(( error, results ) => {
            if( error ) {
                error.status = 500;
                return next( error );
            }

            res.json( results );
        });
});

/*
    *** Sample queries ***
    POST http://localhost:3000/api/teams

    Send team details in request body
    ---------------------------------
    {
        "name": "Social media marketing team",
        "shortName": "social-media-team",
        "description": "Team marketing products on Twitter, Facebook and Instagram",
        "members": [
            {
                userId: 123,
                email: "john.doe@example.com"
            },
            {
                userId: 456,
                email: "jane.doe@example.com"
            }
        ]
    }
*/
router.post('/', authenticate);
router.post('/', function (req, res, next) {
    const userId = res.locals.claims.userId;
    const email = res.locals.claims.email;

    const team = req.body;

    if( !team ) {
        const error = new Error( `Team details not sent in request body` );
        error.status = 400;
        return next( error );
    }

    let memberEmails, memberFilter;

    memberEmails = team.members instanceof Array ? (
        team.members.map( member => {
            return ( typeof member === 'object' && member !== null ) ? member.email : member;
        })
    ) : [];

    memberFilter = { email: { $in: memberEmails } };
    
    let validMembers;

    User
        .find( memberFilter )
        .exec((error, users) => {
            if (error) {
                error.status = 500;
                return next(error);
            }

            // add valid users
            validMembers = users.map(user => {
                return {
                    userId: user._id,
                    email: user.email
                };
            });

            // add logged in user
            validMembers.push( { userId, email } );

            team.members = validMembers;

            Team
                .create(team, ( error, createdTeam ) => {
                    if( error ) {
                        error.status = 500;
                        return next(error);
                    }

                    res.json( createdTeam );
                });
        });
});

/*
    Adding a new user as member of a team
    
    *** Sample queries ***
    http://localhost:3000/api/team/345678901234567890123413?action=add_member&userId=123456789012345678901236&email=mark.smith@example.com
*/
router.patch('/:id', authenticate);
router.patch('/:id', function (req, res, next) {
    const teamId = req.params.id;
    const action = req.query.action

    let userId, email;

    if (action === 'add_member') {
        userId = req.query.userId;
        email = req.query.email;
    } else if (action === 'remove_member') { // one can remove only oneself (Excuse yourself feature)
        userId = res.locals.claims.userId;
        email = res.locals.claims.email;
    } else {
        const error = new Error( 'Unsupported operation - "action" parameter can take values "add_member" to add a member, and "remove_member" to remove self' );
        error.status = 400;
        return next(error);
    }

    const filter = {};

    if (userId) {
        filter._id = userId;
    }

    if (email) {
        filter.email = email;
    }

    User
        .findOne(filter)
        .exec((error, result) => {
            if (error) {
                error.status = 500;
                return next(error);
            }

            if (!result) {
                const error = new Error(`user with matching user id = ${userId} and email id = ${email} not found`);
                return next(error);
            }

            const updateDoc = { };

            switch( action ) {
                case 'add_member':
                    updateDoc.$addToSet = {};
                    updateDoc.$addToSet.members = {
                        $each: [ 
                            {
                                userId: result._id,
                                email: result.email
                            }
                        ]
                    };
                    break;
                case 'remove_member':
                    updateDoc.$pull = {};
                    updateDoc.$pull.members = { 
                        userId: result._id,
                        email: result.email
                    };
                    break;
            }

            Team
                .findByIdAndUpdate(teamId, updateDoc)
                .exec((error, updatedTeam) => {
                    if (error) {
                        error.status = 500;
                        return next(error);
                    }

                    res.json(updatedTeam);
                });
        });
});

module.exports = router;