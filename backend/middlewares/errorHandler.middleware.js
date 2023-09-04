const notFound = (req, res, next) => {
  // console.log('originalUrl', req.originalUrl)
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  console.log('error', err)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  //check for invalid ObjectID or cast error

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resrounce not found`
    statusCode = 404
  }

  res.status(statusCode).json({
    message,
    stack: err.stack,
  })
}

export { notFound, errorHandler }
