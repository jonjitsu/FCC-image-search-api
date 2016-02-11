'use strict';

var fs = require('fs'),
    render = function render(tmp) {
    return fs.readFileSync('view/' + tmp + '.html').toString();
},
    easyRenderer = function easyRenderer(req, res, next) {
    res.render = function (tpl) {
        res.send(render(tpl));
    };
    next();
};

module.exports = easyRenderer;