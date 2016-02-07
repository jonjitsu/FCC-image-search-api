import { assert } from 'chai';
import ImgSearcher from '../src/img-searcher';

const is = assert.strictEqual,
      de = assert.deepEqual,
      fs = require('fs'),
      FIXTURES = './test/fixtures/',
      save = function(data, filename) {
          fs.writeFileSync(FIXTURES + filename + '.json', JSON.stringify(data));
      },
      load = function(filename) {
          return JSON.parse(fs.readFileSync(FIXTURES + filename + '.json'));
      },
      config = require('configuror')({env:'test'})
;

describe('img-searcher', ()=>{
    it('can search for images', (done)=>{
        let
            mock500px = {
                photos: {
                    searchByTerm(term, options, cb) {
                        cb(null, load('500px.search.blue mood'));
                    }
                }
            },
            imgSearcher = ImgSearcher(config, mock500px)

        imgSearcher
            .searchTerm('blue mood')
            .then((results) => {
                let expected = load('searchTerm.blue mood.results');
                de(expected, results);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
