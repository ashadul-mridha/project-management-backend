const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    getAllData,
    getDataByID,
    sendMail
} = require('../controllers/userController');

//registration new user
router.post('/registration' , registrationUser)
//login new user
router.post('/login' , loginUser)
//get all user
router.get('/' , getAllData)
//get user by if
router.get('/:id' , getDataByID)

router.delete('/' , sendMail)

module.exports = router;