// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://mock-stg.getpackage-dev.com',
    defaultLang: 'en',
    googleMapUrl: 'https://maps.googleapis.com/maps/api/js?key=[KEY]',
    country: 'Israel',
    mapInitCoord: {
        lat: 31.02083010740423,
        lng: 34.955112618345595,
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.