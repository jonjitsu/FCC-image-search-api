
const MongoClient = require('mongodb').MongoClient;

module.exports = config => {
    const
          withDb = (() => {
              let db=undefined,
                    setupCleanup = db => {
                        const cleanup = () => {
                            if(db!==undefined) db.close();
                        };
                        process.on('SIGTERM', cleanup);
                        process.on('SIGINT', cleanup);
                    };

              return cb => {
                  if( db===undefined ) {
                      MongoClient.connect(config.db.uri, (err, dbInstance) => {
                          if(err) throw err;

                          db = dbInstance;
                          setupCleanup(db);
                          cb(db);
                      });
                  } else cb(db);
              };
          })(),
    withCollection = (collection, cb) => {
        withDb(db=>{
            cb(db.collection(collection));
        });
    };

    return {
        db: withDb,
        collection: withCollection
    };
};
