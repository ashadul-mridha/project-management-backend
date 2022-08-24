//not found error handler
function notFoundhandler(req,res,next) {
    next("Your Request Route Was Not Found")
}

//default error handler
function defaultErrorHandler(err,req,res,next){
    res.status(500).json({
        status: 500,
        message: err.message
    })
}

module.exports = {
    notFoundhandler,
    defaultErrorHandler
}