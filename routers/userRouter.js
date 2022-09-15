const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    getAllData,
    getDataByID,
    getProjectByUserID,
    getTaskByUserID,
    getTodayTaskByUserID,
    getUpcommingTaskByUserID,
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
//get today task by user
router.get('/task/today', checkLogin , getTodayTaskByUserID)
//get upcomming task by user
router.get('/task/upcomming', checkLogin , getUpcommingTaskByUserID)
//get user by if
router.get('/:id' , getDataByID)

router.delete('/' , sendMail)

module.exports = router;