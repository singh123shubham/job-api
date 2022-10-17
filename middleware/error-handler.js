const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let coustomError = {
    //set default
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went try again later'

  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if(err.name === 'ValidatorError'){
    coustomError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    coustomError.statusCode == 400  
  }

  if(err.code && err.code === 11000){
    coustomError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field , please choose another email ID`
    coustomError.statusCode == 400
  }

  if(err.name === "CastError"){
    coustomError.msg = `No item found with ID : ${err.value}`
    coustomError.statusCode == 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(coustomError.statusCode).json({ msg:coustomError.msg })

}

module.exports = errorHandlerMiddleware
