
const TRACKING_COLLECTION = 'tracking_stats',

      factory = config => {
          const a=1,

                store = require('./mongo-wrapper')(config),

                track = (term, cb) => {
                    store.withDb(db => {
                        db
                            .collection(TRACKING_COLLECTION)
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
                    store.withDb(db => {
                        db
                            .collection(TRACKING_COLLECTION)
                            .findOne({ term: term }, (err, stat) => {
                                if(err) throw err;
                                else cb(stat);
                            });
                    });
                }
          ;

          return {
              track: track,
              get: get
          };
      };

factory.COLLECTION = TRACKING_COLLECTION;

module.exports = factory;
