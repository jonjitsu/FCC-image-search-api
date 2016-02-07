
import http from 'http';

const config = require('configuror')(),
      app = require('./app')(config),
      server = app.listen(config.app.port, ()=> {
          let port = server.address().port;
          console.log('Up an runnin on port ' + port);
      });