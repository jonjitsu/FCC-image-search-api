module.exports = {
    debug: process.env.DEBUG_APP || false,
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        uri: process.env.MONGOLAB_URI || 'mongodb://localhost:30001/img_searcher'
    },
    "500px": {
        consumerKey: process.env.KEY_500PX
    }
};
