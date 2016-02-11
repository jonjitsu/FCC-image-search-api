'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = function (config) {
    var withDb = function () {
        var db = undefined,
            setupCleanup = function setupCleanup(db) {
            var cleanup = function cleanup() {
                if (db !== undefined) db.close();
            };
            process.on('SIGTERM', cleanup);
            process.on('SIGINT', cleanup);
        };

        return function (cb) {
            if (db === undefined) {
                MongoClient.connect(config.db.uri, function (err, dbInstance) {
                    if (err) throw err;

                    db = dbInstance;
                    setupCleanup(db);
                    cb(db);
                });
            } else cb(db);
        };
    }(),
        withCollection = function withCollection(collection, cb) {
        withDb(function (db) {
            cb(db.collection(collection));
        });
    };

    return {
        db: withDb,
        collection: withCollection
    };
};