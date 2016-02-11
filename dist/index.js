'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('configuror')(),
    app = require('./app')(config),
    server = app.listen(config.app.port, function () {
    var port = server.address().port;
    console.log('Up an runnin on port ' + port);
});