import express from 'express';

module.exports = config => {
    let app = express();

    if(config.debug) console.log(JSON.stringify(config, process.env));

    app
    // Setup middlewares
        .use(require('./middlewares/json-beautifier'))
        .use(require('./middlewares/easy-renderer'))
        .get('/', (req, res) => {
            res.render('index');
        });


    // Setup api
    require('./apis/status')(app);
    require('./apis/img-searcher')(app, config);
    require('./apis/notfound')(app);

    return app;
};
