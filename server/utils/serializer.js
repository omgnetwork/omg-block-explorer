
function handleResponse (response) {
  return { success: response.data.success, data: response.data.data }
}

function handleError (error) {
  if (error.response) {
    return { success: false, error: error.response.data.data || error.response.statusText }
  } else if (error.request) {
    return { success: false, error: null }
  } else {
    return { success: false, error: error.message }
  }
}

module.exports = {
  handleResponse, handleError
}
