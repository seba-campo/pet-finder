import * as dotenv from 'dotenv';

// Acceder a las variables
export function loadKeys(){
    const dbEndpointMock = process.env.DB_ENDPOINT_MOCK;
    const dbEndpoint = process.env.DB_ENDPOINT;
    const algoliaAppId = process.env.ALGOLIA_APP_ID;
    const algoliaSearchApiKey = process.env.ALGOLIA_SEARCH_API_KEY;
    const algoliaWriteApiKey = process.env.ALGOLIA_WRITE_API_KEY;
    const mapboxToken = process.env.MAPBOX_TOKEN;

    console.log({
      "databases": {
        "elephant": {
              "DB_ENDPOINT_MOCK": dbEndpointMock,
              "DB_ENDPOINT": dbEndpoint
        },
        "algolia": {
              "APP_ID": algoliaAppId,
              "SEARCH_API_KEY": algoliaSearchApiKey,
              "WRITE_API_KEY": algoliaWriteApiKey
        }
      },
      "services": {
          "mapbox": {
              "token": mapboxToken
        }
      }
  })


    return {
        "databases": {
          "elephant": {
                "DB_ENDPOINT_MOCK": dbEndpointMock,
                "DB_ENDPOINT": dbEndpoint
          },
          "algolia": {
                "APP_ID": algoliaAppId,
                "SEARCH_API_KEY": algoliaSearchApiKey,
                "WRITE_API_KEY": algoliaWriteApiKey
          }
        },
        "services": {
            "mapbox": {
                "token": mapboxToken
          }
        }
    }
}