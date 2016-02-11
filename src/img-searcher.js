import Api500px from '500px';
import _ from 'lodash';

const BASE_URL = 'https://500px.com';
// converts photos array to results
function formatResponse(photos) {
    return photos
        .map(photo=>{
            return {
                url: photo.image_url,
                thumbnail: photo.image_url,
                title: photo.name,
                description: photo.description,
                origin: BASE_URL + photo.url
            };
        })
        .slice(0,10);
}
// module.exports = (config) => {
export default (config, api) => {
    const api500px = api || new Api500px(config['500px'].consumerKey)

    return {
        /**
           SearchTerm:

           Format:
           [
             {
                url: 'url',
                thumbnail: 'url',
                description: 'text',
                origin: 'url'
             }
           ]

         */
        searchTerm(term, options) {
            const defaults = { rpp: 10, page:1 };
            options = _.extend({}, defaults, options);

            return new Promise((resolve, reject)=>{
                api500px.photos.searchByTerm(term, options, (error, results) => {
                    console.log('SearchByTerm: ' + JSON.stringify(results));
                    if(error) reject(error);
                    else {
                        if( results && results.photos ) resolve(formatResponse(results.photos));
                        else reject(new Error('Bad response.'));
                    }
                });
            });
        }
    }
};
