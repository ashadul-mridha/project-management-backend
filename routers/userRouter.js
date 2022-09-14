const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    getAllData,
    getDataByID,
    getProjectByUserID,
    getTaskByUserID,
    sendMail
} = require('../controllers/userController');
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//registration new user
router.post('/registration' , registrationUser)
//login new user
router.post('/login' , loginUser)
//get all user
router.get('/' , getAllData)
//get all project by user
router.get('/project', checkLogin , getProjectByUserID)
//get all task by user
router.get('/task', checkLogin , getTaskByUserID)
//get user by if
router.get('/:id' , getDataByID)

router.delete('/' , sendMail)

module.exports = router;