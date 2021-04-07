// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: 'http://uplsv.com.ng/kyc/public/api/v1',
  // API_URL: 'http://192.168.43.25:2015/api/paychoicedirect',
  API_URL: 'https://1e1611c582fd.ngrok.io/api/paychoicedirect',
  API_VERSION: 'v1',
  JWT_KEY: 'oiuytrertyu',
  TOKEN: 'kyc_upperlink_token_3456789',
  ROLE: 'kyc_upperlink_role_97323456',
  TOKEN_DATE: 'kyc_upperlink_date_97323456',
  DATE_NOW: 'kyc_upperlink_date_956323456',
  PRIVATE_KEY: `3KYC-UPPERLINKgfdertyuhghgfrtyhbdrtyuytfhtrtyuhgghtrdfgytdghtrtre2345678uyfdvcxsaqq5wertyuijbvcxdffdcvgfghyt6t`,
  USERTOKEN: 'kyc_upperlink_user_56789',
  ACTION_KEY: '12384-KYC-UPPERLINK9-2tred;sdfguytr08j-987to890pojrt9-2tred;sdfguytr08j-arokoyuolalekan',
  URL_VALIDATION:  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
  EMAIL_VALIDATION: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
