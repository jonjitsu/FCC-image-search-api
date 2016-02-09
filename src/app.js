import express from 'express';
import ImgSearcher from './img-searcher';

module.exports = config => {
    let app = express();

    app
        .get('/', (req, res) => {
            res.send('root page');
        })
        .get(/^\/imagesearch\/(.*)/, (req, res)=>{
            let term = req.params[0],
                searcher = ImgSearcher(config);

            searcher
                .searchTerm(term, { page: req.query.offset })
                .then(results=>{
                    res.json(results);
                    // res.end();
                },
                error=>{
                    res.send('Internal error @TODO fix this up');
                    // res.end();
                });
          
        })
    return app;
};
