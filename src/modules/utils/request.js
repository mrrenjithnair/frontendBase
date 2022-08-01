import 'whatwg-fetch';
import {getError,} from './commonUtils';
var _ = require('lodash');

export function toURLString (params) {
  var str = [];
  var notNulls = 0;
  for(var p in params) {
    if (!_.isNull(params[p]) && !_.isUndefined(params[p]) && params[p]!=='' && params[p]!==false) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      notNulls = notNulls + 1;
    }
  }

  var ret = ''
  if (notNulls == 0) {
    ret = ''
  }
  else {
    ret = '?' + str.join("&")
  }

  return ret
}
export async function request(url, opts) {
  opts = _.extend({
    method: 'GET',
    body: null,
    callback: null,
    sessionToken: null,
    deviceID: 'Browser',
    userID: null,
  }, opts)

  var reqOpts = {
    method: opts.method,
    headers: {}
  }

  if (opts.sessionToken && !opts.microsoftUpload) {
    reqOpts.headers['api_key'] = opts.sessionToken
  }

  if (opts.userID && !opts.microsoftUpload) {
    reqOpts.headers['userID'] = opts.userID
  }

  if (opts.method === 'POST' || opts.method === 'PUT' && !opts.microsoftUpload) {
    reqOpts.headers['Accept'] = 'application/json'
    reqOpts.headers['Content-Type'] = 'application/json'
  }

  if (opts.body) {
    reqOpts.body = JSON.stringify(opts.body)
  }
  
  if (opts.method === 'FILEPOST') {
    reqOpts.headers['Accept'] = 'application/json'
    // reqOpts.headers['Content-Type'] = 'application/json'
    reqOpts.method = 'POST'
    reqOpts.body = opts.formData
  }
  let res = {}

  let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json().then((json) => {
      res.json = json
      return res
    })
    .then((res) => {
      if (res.status === 401) {
        //place your reentry code
        localStorage.clear()
       }
      if (res.status == 300) {
        return res.json
      } else if (res.status >= 200 && res.status < 300) {
        return res.json
      }
      else {
        throw getError(res.json)
      }
    })
    .catch((error) => {
      throw(error)
    })
}
