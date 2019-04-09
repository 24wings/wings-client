// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export enum DataMode {
  /**本地模拟数据 */
  LocalStorage
}
export const environment = {
  ip: "http://0.0.0.0:5000",
  production: false,
  get dvoUrl() {
    return this.ip + "/api/RBAC/Demo/";
  },
  dataMode: DataMode.LocalStorage
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
