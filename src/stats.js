
const TRACKING_COLLECTION = 'tracking_stats',

      factory = config => {
          const a=1,

                store = require('./mongo-wrapper')(config),

                track = (term, cb) => {
                    if(cb===undefined) cb = function() {};

                    store.collection(TRACKING_COLLECTION, collection => {
                        collection
                            .findAndModify(
                                { term: term },
                                [],
                                { $inc:{count:1}, $set:{ term:term, last:Date.now() } },
                                { upsert:true, new:true, w:1 },
                                (err, stat) => {
                                    if(err) throw err;
                                    else cb(stat.value);
                                });
                    });
                },


                get = (term, cb) => {
                    store.collection(TRACKING_COLLECTION, collection => {
                        collection
                            .findOne({ term: term }, (err, stat) => {
                                if(err) throw err;
                                else cb(stat);
                            });
                    });
                },

                lastX = (x, cb) => {
                    if( typeof x==='function' ) { cb = x; x=10; }

                    store.collection(TRACKING_COLLECTION, collection => {
                        collection
                            .find({}, { _id:0, term:1, last:1, count:1 })
                            .sort({last:-1})
                            .limit(x)
                            .toArray((err, data) => {
                                if(err) throw err;
                                cb(data);
                            });
                    });
                }
          ;

          return {
              track: track,
              get: get,
              last: lastX
          };
      };

factory.COLLECTION = TRACKING_COLLECTION;

module.exports = factory;
