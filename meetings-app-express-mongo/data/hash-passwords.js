const users = require( './users.raw.json' );
const bcrypt = require( 'bcrypt' );
const async = require( 'async' );
const fs = require( 'fs' );
const path = require( 'path' );

const SALT_FACTOR = 10;

// hash and save password
const encryptPassword = ( user, done ) => {
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            return done( err );
        }

        bcrypt.hash( user.password, salt, ( err, hashedPassword ) => {
            if( err ) {
                return done( err );
            }

            user.password = hashedPassword;
            done();
        });
    });
}

async.each( users, encryptPassword, err => {
    if( err ) {
        console.log( 'Some error occured : ', err );
    } else {
        console.log( 'All passwords were encrypted' );

        fs.writeFileSync( path.join( __dirname, './users.json' ), JSON.stringify( users, null, 4 ) );
    }
});