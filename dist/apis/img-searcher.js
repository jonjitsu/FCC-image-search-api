'use strict';

var _imgSearcher = require('../img-searcher');

var _imgSearcher2 = _interopRequireDefault(_imgSearcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, config) {
    var stats = require('../stats')(config),
        formatDate = function formatDate(ts) {
        return new Date(ts).toString();
    };

    app.get(/^\/imagesearch\/(.*)/, function (req, res) {
        var term = req.params[0],
            searcher = (0, _imgSearcher2.default)(config);

        stats.track(term);

        searcher.searchTerm(term, { page: req.query.offset }).then(function (results) {
            res.json(results);
        }, function (error) {
            res.send('Internal error @TODO fix this up');
        });
    }).get('/recentsearches', function (req, res) {
        stats.last(function (data) {
            data.forEach(function (stat) {
                stat.last = formatDate(stat.last);
            });
            res.json(data);
        });
    });
    return app;
};