import ImgSearcher from '../img-searcher';


module.exports = (app, config) => {
    const stats = require('../stats')(config),

          formatDate = ts => {
              return new Date(ts).toString();
          };

    app
        .get(/^\/imagesearch\/(.*)/, (req, res)=>{
            let term = req.params[0],
                searcher = ImgSearcher(config);

            stats
                .track(term);

            searcher
                .searchTerm(term, { page: req.query.offset })
                .then(results=>{
                    res.json(results);
                },
                error=>{
                    res.send('Internal error @TODO fix this up');
                });
          
        })

        .get('/recentsearches', (req, res) => {
            stats.last(data=>{
                data.forEach(stat => {
                    stat.last = formatDate(stat.last);
                });
                res.json(data);
            });
        });
    return app;
};
