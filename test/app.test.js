import http from 'http';

require('./helpers').globalize();

const
      config = require('configuror')({env:'test'}),
      app = require('../src/app')(config),
      port = config.app.port;


describe('app', ()=>{
    let server;
    
    beforeEach(()=>{
        server = app.listen(port);
    });

    afterEach(()=>{
        server.close();
    });

    it('should return 200', done => {
        http.get('http://127.0.0.1:' + port, res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});
