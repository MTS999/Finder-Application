import CustomError from "../utils/CustomError.js";
const devErrors = (res, error) => {
    console.log("mts");
    
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
    name:error.keyValue,
    // mts: error.name,
    field:Object.keys(error.keyValue)[0]
  });
};
const prodErrors = (res, error) => {
    
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong! please try agian later",
    });
  }
};

const castErrorHandler = (error) => {
  const msg = `invalid  value ${error.value} for field ${error.path}`;
  return new CustomError(msg, 400);
};
const DublicateErrorHandler = (error) => {
  const name = error.keyValue;
  const field=Object.keys(error.keyValue)[0]
  const value=Object.values(error.keyValue)[0]
  // mts: error.name,
  const msg = `There is alreaady a ${field} with value ${value} Please use anothere name`;

  return new CustomError(msg, 400);
};
const ValidatioErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const errorMesseages = errors.join(".==");
  const msg = `invalid input data ${errorMesseages} `;

  return new CustomError(msg, 400);
};
const ExpiredJWTHandler = (error) => {
  const msg = `JWT expired Please login again`;

  return new CustomError(msg, 401);
};
const InvalidTokenHandler = (error) => {
  const msg = `JWT token is invalid, Please login again`;

  return new CustomError(msg, 401);
};
export const globalErrorHandler = (error, req, res, next) => {
    
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production")  {
    console.log(error);
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    if (error.code === 11000) {
      error = DublicateErrorHandler(error);
    //   console.log("mts");
    }
    if (error.name === "ValidationError") {
      error = ValidatioErrorHandler(error);
      // console.log("mts");
    }
    if (error.name === "TokenExpiredError") {
      error = ExpiredJWTHandler(error);
      // console.log("mts");
    }
    if (error.name === "JsonWebTokenError") {
      error = InvalidTokenHandler(error);
      // console.log("mts");
    }
    prodErrors(res, error);
  }
};
