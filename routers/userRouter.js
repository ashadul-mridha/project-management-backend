const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    getAllData
} = require('../controllers/userController');

//registration new user
router.post('/registration' , registrationUser)
//login new user
router.post('/login' , loginUser)
//get all user
router.get('/' , getAllData)

module.exports = router;