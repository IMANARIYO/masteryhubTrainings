export function AppError (message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

export function successResponse (message, data = null) {
  return {
    success: true,
    message,
    data,
    error: null
  }
}

export function errorResponse (message, error = null) {
  return {
    success: false,
    message,
    data: null,
    error
  }
}
