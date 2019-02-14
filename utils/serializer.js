import _ from 'lodash'
export function handleResponse (response) {
  if (response.data.success) {
    return { success: true, data: response.data.data, error: {} }
  } else {
    return {
      success: false,
      error: {
        code: _.get(response, 'data.data.error.code', null),
        description: _.get(response, 'data.data.error.description', null)
      }
    }
  }
}

export function handleError (error) {
  console.error(error)
  if (error.response) {
    return {
      success: false,
      error: {
        code: error.response.status,
        description: error.response.statusText
      }
    }
  } else if (error.request) {
    return { success: false, error: { code: null, description: null } }
  } else {
    return {
      success: false,
      error: {
        code: null,
        description: 'Something went wrong on the server.'
      }
    }
  }
}
