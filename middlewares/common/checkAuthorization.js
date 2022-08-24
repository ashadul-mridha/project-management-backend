const jwt = require("jsonwebtoken");
const db = require('../../models');

const User = db.user;

// auth guard to protect routes that need authentication
const checkLogin = async (req, res, next) => {

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
             // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and set it user
            req.user = await User.findOne({ where : {id: decoded.userid} ,
                attributes: {
                    exclude: ["password","isDeleted","active"]
                }
            })

            next()
        } else {
            res.status(401).send({
                status: false,
                message: "Not Authorize",
                data : null,
                statusCode: 401
            })
        }
    } catch (error) {
        res.status(401).send({
            status: false,
            message: "Not Authorize",
            data : null,
            statusCode: 401
        })
    }

};


module.exports = {
  checkLogin
};