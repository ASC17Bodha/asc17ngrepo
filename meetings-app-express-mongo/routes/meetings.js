// Handles /api/meetings/...

const express = require('express');
const mongoose = require( 'mongoose' );

const router = express.Router();
const User = mongoose.model( 'User' );
const Meeting = mongoose.model( 'Meeting' );

const { authenticate } = require( '../utils/auth' );

/*
    *** Sample queries ***
    http://localhost:3000/api/meetings?period=all&userId=123456789012345678901234&email=john.doe@example.com
    http://localhost:3000/api/meetings?period=all&userId=123456789012345678901234
    http://localhost:3000/api/meetings?period=past&email=john.doe@example.com
*/
router.get( '/', authenticate );
router.get( '/', function (req, res, next) {
    let period = req.query.period;
    const search = req.query.search;
    const userId = res.locals.claims.userId;
    const email = res.locals.claims.email;

    const filter = { date: { }, attendees: { $elemMatch: { } } };

    if( userId ) {
        filter.attendees.$elemMatch.userId = userId;
    }
    
    if( email ) {
        filter.attendees.$elemMatch.email = email;
    }

    const today = new Date();
    
    const todayStart = new Date( today.toISOString().substr( 0, 10 ) );
    const tomorrowStart = new Date( today.toISOString().substr( 0, 10 ) );
    tomorrowStart.setDate( tomorrowStart.getDate() + 1 )

    if( period ) {
        period = period.toLowerCase();

        if( typeof period !== 'string' ) {
            const error = new Error( `"period" parameter when specified can take only the following values - "past" | "present" | "future" | "all". You sent something that was not a string.` );
            error.status = 400;
            return next( error );
        }

        switch( period ) {
            case "past":
                filter.date.$lt = todayStart;
                break;
            case "present":
                filter.date.$gte = todayStart;
                filter.date.$lt = tomorrowStart;
                break;
            case "future":
                filter.date.$gte = tomorrowStart;
                break;
            case "all":
                delete filter.date;
                break;
            default:
                const error = new Error( `"period" parameter when specified can take only the following values - "past" | "present" | "future" | "all". You specified ${period}.` );
                error.status = 400;
                return next( error );
        }
    } else {
        delete filter.date;   
    }

    if( search ) {
        if( typeof search !== 'string' ) {
            const error = new Error( `"search" parameter when specified must be a string. You sent something that was not a string.` );
            error.status = 400;
            return next( error );
        }

        filter.$text = {
            $search: search
        };
    }

    Meeting
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
    POST http://localhost:3000/api/meetings

    Send meeting details in request body
    ------------------------------------
    {
        "name": "Twitter marketing campaign",
        "description": "Increasing brand awareness and spreading information about new products",
        "date": "2020-10-28",
        "startTime": {
            "hours": 9,
            "minutes": 0
        },
        "endTime": {
            "hours": 10,
            "minutes": 30
        },
        "attendees": [
            {
                email: "john.doe@example.com"
            },
            {
                email: "jane.doe@example.com"
            }
        ]
    }
*/
router.post('/', authenticate);
router.post('/', function (req, res, next) {
    const userId = res.locals.claims.userId;
    const email = res.locals.claims.email;

    const meeting = req.body;

    if( !meeting ) {
        const error = new Error( `Meeting details not sent in request body` );
        error.status = 400;
        return next( error );
    }

    // check if attendee email ids are all valid
    const attendeeEmails = meeting.attendees.map( attendee => {
        return ( typeof attendee === 'object' && attendee !== null ) ? attendee.email : attendee;
    });
    const attendeeFilter = { email: { $in: attendeeEmails } };
    
    let validAttendees;

    User
        .find( attendeeFilter )
        .then(users => {
            // add valid users
            validAttendees = users.map(user => {
                return {
                    userId: user._id,
                    email: user.email
                };
            });

            // add logged in user (if not alredy in meeting attendees list)
            if( !validAttendees.find( attendee => attendee.userId.toString() === userId ) ) {
                validAttendees.push( { userId, email } );
            }

            meeting.attendees = validAttendees;

            return Meeting.create( meeting );
        })
        .then(createdMeeting => {
            res.json( createdMeeting );
        })
        .catch(error => {
            error.status = 500;
            return next(error);
        });
});

/*
    Adding a new user as attendee for a meeting
    
    *** Sample queries ***
    http://localhost:3000/api/meetings/345678901234567890123413?action=add_attendee&userId=123456789012345678901236&email=mark.smith@example.com
*/
router.patch( '/:id', authenticate );
router.patch( '/:id', function( req, res, next ) {
    const meetingId = req.params.id;
    const action = req.query.action;

    let userId, email;

    if( action === 'add_attendee' ) {
        userId = req.query.userId;
        email = req.query.email;
    } else if( action === 'remove_attendee' ) { // one can remove only oneself (Excuse yourself feature)
        userId = res.locals.claims.userId;
        email = res.locals.claims.email;
    } else {
        const error = new Error( 'Unsupported operation - "action" parameter can take values "add_attendee" to add an attendee, and "remove_attendee" to remove self' );
        error.status = 400;
        return next( error );
    }
    
    const filter = {};

    if( userId ) {
        filter._id = userId;
    }
    
    if( email ) {
        filter.email = email;
    }

    User
        .findOne( filter )
        .exec(( error, result ) => {
            if( error ) {
                error.status = 500;
                return next( error );
            }

            if( !result ) {
                const error = new Error( `user with matching user id = ${userId} and email id = ${email} not found` );
                error.status = 404;
                return next( error );
            }

            const updateDoc = { };

            switch( action ) {
                case 'add_attendee':
                    updateDoc.$addToSet = {};
                    updateDoc.$addToSet.attendees = {
                        $each: [ 
                            { userId: result._id, email: result.email }
                        ]
                    };
                    break;
                case 'remove_attendee':
                    updateDoc.$pull = {};
                    updateDoc.$pull.attendees = {
                        userId: result._id,
                        email: result.email
                    };
                    break;
            }

            Meeting
                .findByIdAndUpdate( meetingId, updateDoc )
                .exec(( error, updatedMeeting ) => {
                    if( error ) {
                        error.status = 500;
                        return next( error );
                    }

                    res.json( updatedMeeting );
                });
        });
});

module.exports = router;