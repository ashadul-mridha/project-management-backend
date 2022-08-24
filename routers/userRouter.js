const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser
} = require('../controllers/userController');

//registration new user
router.post('/registration' , registrationUser)
//login new user
router.post('/login' , loginUser)

module.exports = router;