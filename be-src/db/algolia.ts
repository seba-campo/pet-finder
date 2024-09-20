// Importar todo el módulo algoliasearch
import * as algo from 'algoliasearch';

export const algoliaDb = algo.default(
    "LY2I08L66Q",
    "638064402fff6b133acb653029ab0060"
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
