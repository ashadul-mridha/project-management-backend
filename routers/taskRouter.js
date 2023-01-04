const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addTaskAndImage,
    addData,
    getAllData,
    getUpcommingAllTask,
    getTodayAllTask,
    getDataByID,
    getDataByProjectID,
    updateDataByID,
    updateStatusByTaskID,
    deleteDataById
} = require('../controllers/taskController');

// add new data
router.post('/imageUser', checkLogin , addTaskAndImage)
// add new data
router.post('/' , addData)
//get all data
router.get('/', checkLogin , getAllData)
//get all upcomming Data
router.get('/upcomming', checkLogin , getUpcommingAllTask)
//get all today Data
router.get('/today', checkLogin , getTodayAllTask)
//get single data 
router.get('/:id' , getDataByID)
//get single data by project ID
router.get('/project/:projectId' , getDataByProjectID)
//update single data 
router.put('/:id' , checkLogin , updateDataByID)
//update single data 
router.put('/changeStatus/:id' , checkLogin , updateStatusByTaskID)
//delete single data 
router.delete('/:id', checkLogin , deleteDataById)

module.exports = router;