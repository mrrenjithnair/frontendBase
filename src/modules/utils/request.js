import 'whatwg-fetch';
import {getError,} from './commonUtils';
var _ = require('lodash');


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

  let res = {}

  let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json().then((json) => {
      res.json = json
      return res
    })
    .then((res) => {
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
