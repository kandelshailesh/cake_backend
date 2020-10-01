
module.exports = (err, req, res, next) => {
    if (!err.httpStatusCode)
        err.httpStatusCode = 500;
    /*
    res.status(err.httpStatusCode).send({  //enable only this for production
        success: false, message: err.httpStatusCode == 500 ? "Internal Server Error!" : err.message
    });
    */
    res.status(err.httpStatusCode).send({success: false, message: String(err) });  //enable only this for test
}