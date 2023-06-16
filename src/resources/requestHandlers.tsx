//If api response status bigger than 200 and smaller then 300 accept response
export function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return new Promise((resolve, reject) => {
      return reject(response)
    })
  }
}

//wrap response to json object
export function json(response) {
  return response.json()
}

