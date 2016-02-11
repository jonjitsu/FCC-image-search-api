import { MongoClient } from 'mongodb';
require('./helpers').globalize();

const config = require('configuror')({env:'test'}),
      statsService = require('../src/stats'),
      stats = statsService(config);

describe('stats', () => {
    let db;


    it('can track searchTerms', (done) => {
        let expected = 'l0l katz';
        assert.isFunction(stats.track);
        stats.track(expected, stat => {
            is(expected, stat.term);
        });

        stats.get(expected, stat => {
            is(expected, stat.term);
            done();
        });
    });


    before(done=>{
        MongoClient.connect(config.db.uri, (err, instance)=>{
            if(err) throw err;
            else db = instance;
            done();
        });
    });
    after(()=>{
        db.close();
    });
    afterEach((done)=>{
        db
            .collection(statsService.COLLECTION)
            .deleteMany({}, (err, results) => {
                if(err) throw error;
                done();
            });
    });

});
