import http from 'http';

require('../helpers').globalize();

const
      config = require('configuror')({env:'test'}),
      port = config.app.port,
      SERVER = 'http://127.0.0.1:' + port,
      get = (path, cb) => {
          http.get(SERVER + path, res => {
              let data='';
              res.on('data', chunk => { data+=chunk.toString(); });
              res.on('end', () => {
                  if(/application\/json/.test(res.headers['content-type']) ) {
                      data = JSON.parse(data);
                  }
                  cb(res, data);
              });
          });
      },
      app = createApp(config)
;


describe('API: ImgSearcher', ()=>{
    let server;
    
    beforeEach(()=>{
        server = app.listen(port);
    });

    afterEach(()=>{
        server.close();
    });


    it('/recentsearches should return the recent searches', (done)=>{
        get('/recentsearches', (res, data) => {
            is(200, res.statusCode);
            deq([], data)
            done();
        });
    });
});
