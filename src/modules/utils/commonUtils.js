var _ = require('lodash');


export function getError (obj) {
    let errorMessage = ''
    if (!_.isNull(obj) && !_.isUndefined(obj)) {
      if (!_.isUndefined(obj.error)) {
        if (!_.isUndefined(obj.error.error)) {
          errorMessage = obj.error.error
        } else {
          errorMessage = obj.error
        }
      }
			else if (obj.message && Array.isArray(obj.message)) {
				return cleanMessage(obj.message.join(", "))
			}
			else {
				//If obj is error, it means it's swagger validation errors
				if (obj.errors && Array.isArray(obj.errors)) {
					if (obj.errors[0] && obj.errors[0].errors && obj.errors[0].errors.length) {
						var err = obj.errors[0].errors
						var errMsgs = []
						for (var i = 0; i < err.length; i++) {
							errMsgs.push(err[i].message)
						}
						return cleanMessage(errMsgs.join(", "))
					}
					return null
				}
				else {
					errorMessage = obj
				}
      }
      if (errorMessage !== '') {
        if (!_.isUndefined(errorMessage.message)) {
          if (errorMessage.message == 'Network request failed') {
            return 'Please make sure you are online and then try again.'
          }
          else {
            return cleanMessage(errorMessage.message)
          }
        } else {
          if (errorMessage == 'Network request failed') {
            return 'Please make sure you are online and then try again.'
          }
          else {
            return cleanMessage(errorMessage)
          }
        }
      }
    }// isNull
  }
  export function clean(obj) {
	var propNames = Object.getOwnPropertyNames(obj);
	for (var i = 0; i < propNames.length; i++) {
	  var propName = propNames[i];
	  if (obj[propName] === null || obj[propName] === undefined) {
		delete obj[propName];
	  }
		  else if ((typeof obj[propName]) == 'string') {
			  obj[propName] = obj[propName].trim()
		  }
	}
	  return obj
  }
  export function cleanMessage(str) {
	  console.log(str)
	var sanitize = false //PROD environment

	if (!str || str==undefined || !sanitize) {
		return str
	}
	else if (str.toLowerCase().indexOf('json') >= 0) {
		return ''
	}
	else if (str.toLowerCase().indexOf('sql') >= 0) {
		return ''
	}
	else if (str.toLowerCase().indexOf('crypt') >= 0) {
		return ''
	}
	else if (str.toLowerCase().indexOf('failed to fetch') >= 0) {
		return 'Server could not be reached. Please ensure you are online and then try again.'
	}

	return str
}


export function formatDate(date) {
	let today = date ? new Date(date): new Date();
	let yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;
	return today =  yyyy + '-' + mm + '-' +dd 
}
export function exportKeyValue(data) {
	if (!data || data.length == 0) return
	let obj = {}
	data.map((item) => {
		if(item.type== 'number'){
			obj[item.key] = parseInt(item.value)
		}else{
			obj[item.key] = item.value

		}
	})
	return obj
}