'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config) {
    var app = (0, _express2.default)();

    app
    // Setup middlewares
    .use(require('./middlewares/json-beautifier.js')).get('/', function (req, res) {
        res.send('@TODO put instructions here');
    });

    // Setup api
    require('./apis/status')(app);
    require('./apis/img-searcher')(app, config);
    require('./apis/notfound')(app);

    return app;
};