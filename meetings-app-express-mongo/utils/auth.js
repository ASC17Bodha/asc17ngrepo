const jwt = require( 'jsonwebtoken' );

function authenticate( req, res, next ) {
    const token = req.header( 'Authorization' );

    if( !token ) {
        return res.status( 403 ).json({
            message: 'Token is not sent'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, claims) {
        if( err ) {
            return res.status( 403 ).json({
                message: 'Go away intruder'
            });
        }

        res.locals.claims = claims;
        
        next();
    });
}

function isAdmin( req, res, next ) {
    if( !res.locals.claims.isAdmin ) {
        const error = new Error( 'You do not have sufficient privileges' );   
        error.status = 403;

        return next( error );
    }

    next();
}

module.exports = {
    authenticate,
    isAdmin
};