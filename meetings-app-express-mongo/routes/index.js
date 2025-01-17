const express = require('express');
const path = require( 'path' );
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Meetings App Server'
    });
});

router.get('/api', function (req, res, next) {
    res.sendFile( path.join( process.cwd(), 'docs', 'api.json' ) );
});

module.exports = router;
