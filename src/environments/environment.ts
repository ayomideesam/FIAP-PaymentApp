// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: 'http://uplsv.com.ng/kyc/public/api/v1',
  // API_URL: 'http://192.168.43.25:2015/api/paychoicedirect',
  API_URL: 'http://localhost:2015/api/fiap',
  API_VERSION: 'v1',
  JWT_KEY: 'oiuytrertyu',
  TOKEN: 'fiap_upperlink_token_3149567',
  ROLE: 'fiap_upperlink_role_97323456',
  TOKEN_DATE: 'fiap_upperlink_token_expiry_date',
  DATE_NOW: 'fiap_upperlink_token_date_now',
  PRIVATE_KEY: `3FIAP-UPPERLINKgfdertyuhghgfrtyhbdrtyuytfhtrtyuhgghtrdfgytdghtrtre2345678uyfdvcxsaqq5wertyuijbvcxdffdcvgfghyt6t`,
  USERTOKEN: 'fiap_upperlink_user_56789',
  USERID: 'fiap_upperlink_user_id',
  USERCOUNT: 'user_count_number',
  AUDITCOUNT: 'audit_count_number',
  BANKCOUNT: 'bank_count_number',
  TOKENEXPIRYCOUNT: 'token_expiry_count',
  LOGOUTTIME: 'log_out_time',
  ACTION_KEY: '12384-FIAP-UPPERLINK9-2tred;sdfguytr08j-987to890pojrt9-2tred;sdfguytr08j-iruobeakhigbe',
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
