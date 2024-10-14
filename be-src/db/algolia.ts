// Importar todo el módulo algoliasearch
import * as algo from 'algoliasearch';
import { loadKeys } from '../controllers/keysController';

export const algoliaDb = algo.default(
    loadKeys().databases.algolia.APP_ID,
    loadKeys().databases.algolia.WRITE_API_KEY
);

// try{
//     const index = algoliaDb.initIndex("pet_locations");
//     index.saveObjects([
//         {
//             "_geoloc": {
//               "lat": 40.639751,
//               "lng": -73.778925
//             },
//             petId: 1
//           }
//     ], { autoGenerateObjectIDIfNotExist: true });
// }catch(e){

// }
