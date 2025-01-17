const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('useFindAndModify', false);
mongoose.set('returnOriginal', false);

// create models
require('../models/User');
require('../models/Team');
require('../models/Meeting');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs( hideBin( process.argv ) ).argv;

const appEnv = process.env.NODE_ENV || 'development';
const isDevelopment = appEnv === 'development';

console.log( `running in environment ${appEnv}` );

const connectionStr = config.getConnectionStr();

// drop existing meetings-app database
config.clean();

console.log( `Connecting to ${connectionStr}` );

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error.bind(console, 'connection error:', err.message);
    process.exit(0);
});

connection.on('open', function () {
    console.log('connected to mongodb database');

    // import seed data, i.e. initial set of documents into collections of meetings-app database
    if( !argv.skipSeed ) {
        config.load();
        config.index();
    }
});