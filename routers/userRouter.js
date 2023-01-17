const router = require('express').Router();

//import all controller 

const{
    registrationUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getAllData,
    getDataByID,
    updateUserById,
    getProjectByUserID,
    getMeetingByUserID,
    getBookingByUserID,
    getProjectBySlugAndUserID,
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
// forgot password
router.post('/forgot/password' , forgotPassword)
// reset password
router.post('/reset/password' , resetPassword)
//get all user
router.get('/' , getAllData)
//get all project by user
router.get('/project', checkLogin , getProjectByUserID)
//get all meeting by user
router.get('/meeting', checkLogin , getMeetingByUserID)
//get all booking by user
router.get('/booking', checkLogin , getBookingByUserID)
//get all project by user
router.get('/project/:slug', checkLogin , getProjectBySlugAndUserID)
//get all task by user
router.get('/task', checkLogin , getTaskByUserID)
//get today task by user
router.get('/task/today', checkLogin , getTodayTaskByUserID)
//get upcomming task by user
router.get('/task/upcomming', checkLogin , getUpcommingTaskByUserID)
//get user by if
router.get('/:id' , getDataByID)
//update user by id
router.put('/:id' , updateUserById)

router.delete('/sendmail' , sendMail)

module.exports = router;