/**
 * This represents some generic auth provider API, like Firebase.
 */

  
// export function signout(evt) {
//     fakeAuthProvider.isAuthenticated = false;
//     setTimeout(callback, 100); // fake async
// }

// export function signin(evt) {
//     fakeAuthProvider.isAuthenticated = true;
//     setTimeout(callback, 100); // fake async
// }


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeAuthProvider = void 0;
/**
 * This represents some generic auth provider API, like Firebase.
 */
var fakeAuthProvider = {
    isAuthenticated: false,
    signin: function (callback) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout: function (callback) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};
exports.fakeAuthProvider = fakeAuthProvider;
