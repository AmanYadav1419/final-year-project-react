// for writting the try catch block again and again
// we can create a seperate file from that we can write try catch block
// so that it removes the writting the same code again and again, & Save time.

// function for try catch block
const TryCatch = (handler) => {
  return async (req, res, next) => {
    try {
      // we send the handler with that req,res,next
      await handler(req, res, next);
    } catch (error) {
      // if error return status 500 with that error message
      res.status(500).json({
        message: error.message,
      });
    }
  };
};

export default TryCatch;