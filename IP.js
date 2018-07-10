const Expo = require('expo');
const { manifest } = Expo.Constants;

// module.exports = manifest.packagerOpts.dev ? manifest.debuggerHost.split(`:`).shift().concat(`:8080`) : 'deckard-server.herokuapp.com';
module.exports = 'deckard-server.herokuapp.com';
