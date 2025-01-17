const express = require( 'express' );
const router = express.Router();
const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );

/**
 * Sample request body
 * req.body = { "name": "John Doe", "email": "john.doe@example.com", "password": "johndoe" }
 */

router.post('/register', (req, res, next) => {
    const credentials = req.body;

    if( !credentials.email ) {
        const error = new Error( 'email id not supplied' );
        error.status = 400;
        return next( error );
    }

    User
        .findOne( { email: credentials.email } )
        .exec(( error, result ) => {
            if( error ) {
                const error = new Error( 'unknown db error' );
                error.status = 500;
                return next( error );
            }

            if( result ) {
                const error = new Error( 'user with this email id already exists' );
                error.status = 409;
                return next( error );
            }

            User
                .create( credentials, ( error, createdUser ) => {
                    if( error ) {
                        error.status = 500;
                        return next(error);
                    }
        
                    res.status( 204 ).send();
                });
        });
});

/**
 * Sample request body
 * req.body = { "email": "john.doe@example.com", "password": "johndoe" }
 */
router.post('/login', (req, res, next) => {
    const credentials = req.body;

    User
        .findOne( { email: credentials.email } )
        .exec(( error, result ) => {
            if( error || !result || typeof result !== 'object' || Object.keys( result ).length === 0 ) {
                if( error ) {
                    error.status = 403;
                    return next( error );
                } else {
                    const error = new Error( 'unknown db error' );
                    error.status = 500;
                    return next( error );
                }
            }

            // check match of password
            result.checkPassword( credentials.password, ( err, isMatch ) => {
                if( err || !isMatch ) {
                    const error = err || new Error( 'credentials do not match' );
                    error.status = 401;
                    return next( error );
                }

                const claims = { email: result.email, userId: result._id };
        
                jwt.sign(claims, process.env.JWT_SECRET_KEY, {expiresIn: '24h'}, function( error, token ) {
                    console.log( 'jwt token generated' );

                    if( error ) {
                        return res.status(401).json({ message: error.message });
                    }

                    res.status(200).json({
                        message: 'Signed in sucessfully',
                        token: token,
                        email: result.email,
                        name: result.name
                    });
                });
            })
        });
});

module.exports = router;