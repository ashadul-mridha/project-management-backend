const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    getAllData,
    getDataByID,
    getTaskByID,
    sendMail
} = require('../controllers/userController');
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//registration new user
router.post('/registration' , registrationUser)
//login new user
router.post('/login' , loginUser)
//get all user
router.get('/' , getAllData)
//get all task by user
router.get('/task', checkLogin , getTaskByID)
//get user by if
router.get('/:id' , getDataByID)

router.delete('/' , sendMail)

module.exports = router;