module.exports = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        uri: 'mongodb://localhost:30001/img_searcher'
    },
    "500px": {
        consumerKey: process.env.KEY_500PX
    }
};
