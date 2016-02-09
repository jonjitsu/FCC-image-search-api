import ImgSearcher from '../img-searcher';

module.exports = (app, config) => {
    app
        .get(/^\/imagesearch\/(.*)/, (req, res)=>{
            let term = req.params[0],
                searcher = ImgSearcher(config);

            searcher
                .searchTerm(term, { page: req.query.offset })
                .then(results=>{
                    res.json(results);
                },
                error=>{
                    res.send('Internal error @TODO fix this up');
                });
          
        });
    return app;
};
