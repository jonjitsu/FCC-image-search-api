'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _px = require('500px');

var _px2 = _interopRequireDefault(_px);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = 'https://500px.com';
// converts photos array to results
function formatResponse(photos) {
    return photos.map(function (photo) {
        return {
            url: photo.image_url,
            thumbnail: photo.image_url,
            title: photo.name,
            description: photo.description,
            origin: BASE_URL + photo.url
        };
    }).slice(0, 10);
}
// module.exports = (config) => {
exports.default = function (config, api) {
    var api500px = api || new _px2.default(config['500px'].consumerKey);

    return {
        /**
           SearchTerm:
            Format:
           [
             {
                url: 'url',
                thumbnail: 'url',
                description: 'text',
                origin: 'url'
             }
           ]
          */

        searchTerm: function searchTerm(term, options) {
            var defaults = { rpp: 10, page: 1 };
            options = _lodash2.default.extend({}, defaults, options);

            return new Promise(function (resolve, reject) {
                api500px.photos.searchByTerm(term, options, function (error, results) {
                    console.log('SearchByTerm: returned');
                    if (error) reject(error);
                    resolve(formatResponse(results.photos));
                });
            });
        }
    };
};