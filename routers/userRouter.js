const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    getAllData,
    getDataByID,
} = require('../controllers/userController');

//registration new user
router.post('/registration' , registrationUser)
//login new user
router.post('/login' , loginUser)
//get all user
router.get('/' , getAllData)
//get user by if
router.get('/:id' , getDataByID)

module.exports = router;