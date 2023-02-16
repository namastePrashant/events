export const generateEncodedFormData = (object) => {
  var formBody = [];
  Object.keys(object).forEach((key) => {
    if (object[key] || typeof object[key] === 'number') {
      let encodedKey = encodeURIComponent(key);
      let encodedObj = encodeURIComponent(object[key]);
      formBody.push(encodedKey + "=" + encodedObj);
    }
  });
  return formBody.join("&");
};

export const generateFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key, keyIndex) => {
    console.log('key', object[key])
    if (object[key]) {
      if (typeof object[key] === 'object') {
        //if its an object
        if (Array.isArray(object[key])) {
          // if the determined object is in array form
          object[key].forEach((item, index) => {
            if (typeof item === 'object') {
              if (item?.type) {
                //this is specifically for file objects....if there is any other with type key,then we'll have to think something else here
                formData.append(`${key}[${index}]`, item);
              } else {
                Object.keys(item).forEach(objectItemKey => {
                  formData.append(`${key}[${index}][${objectItemKey}]`, item[objectItemKey])
                })
              }
            } else {
              // console.log('else condition')
              formData.append(`${key}[${index}]`, item);
            }
          });
        }
        else {
          //if its not in array form
          if (typeof object[key] === 'object') {
            Object.keys(object[key]).forEach((objectItemKey) => {
              // if (object[key][objectItemKey]) {
              formData.append(`orderList[${keyIndex}][${objectItemKey}]`, object[key][objectItemKey] ?? '')
              // }
            })
          } else {
            formData.append(key, object[key]);
          }
        }
      } else {
        formData.append(key, object[key]);
      }
    } else if (object[key] === "") {
      formData.append(key, "")
    }
  });
  return formData;
};

export const getEncodedParams = (body) => {
  const params = new URLSearchParams()
  Object.keys(body).forEach(key => {
    if (body[key]) {
      console.log('key here', body[key])
      params.append(key, body[key])
    }
  })
  return params
}