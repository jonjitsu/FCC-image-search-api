'use strict';

var TRACKING_COLLECTION = 'tracking_stats',
    factory = function factory(config) {
    var a = 1,
        store = require('./mongo-wrapper')(config),
        track = function track(term, cb) {
        if (cb === undefined) cb = function cb() {};

        store.collection(TRACKING_COLLECTION, function (collection) {
            collection.findAndModify({ term: term }, [], { $inc: { count: 1 }, $set: { term: term, last: Date.now() } }, { upsert: true, new: true, w: 1 }, function (err, stat) {
                if (err) throw err;else cb(stat.value);
            });
        });
    },
        get = function get(term, cb) {
        store.collection(TRACKING_COLLECTION, function (collection) {
            collection.findOne({ term: term }, function (err, stat) {
                if (err) throw err;else cb(stat);
            });
        });
    },
        lastX = function lastX(x, cb) {
        if (typeof x === 'function') {
            cb = x;x = 10;
        }

        store.collection(TRACKING_COLLECTION, function (collection) {
            collection.find({}, { _id: 0, term: 1, last: 1, count: 1 }).sort({ last: -1 }).limit(x).toArray(function (err, data) {
                if (err) throw err;
                cb(data);
            });
        });
    };

    return {
        track: track,
        get: get,
        last: lastX
    };
};

factory.COLLECTION = TRACKING_COLLECTION;

module.exports = factory;