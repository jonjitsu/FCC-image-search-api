import express from 'express';

module.exports = config => {
    let app = express();

    app
    // Setup middlewares
        .use(require('./middlewares/json-beautifier.js'))
        .get('/', (req, res) => {
            res.send('@TODO put instructions here');
        });


    // Setup api
    require('./apis/status')(app);
    require('./apis/img-searcher')(app, config);
    require('./apis/notfound')(app);

    return app;
};
