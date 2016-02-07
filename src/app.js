import express from 'express';

module.exports = config => {
    let app = express();

    app
        .get('/', (req, res) => {
            res.send('root page');
        });
    return app;
};
