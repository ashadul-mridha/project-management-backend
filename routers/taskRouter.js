const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addTaskAndImage,
    addData,
    getAllData,
    getDataByID,
    getDataByProjectID,
    updateDataByID,
    deleteDataById
} = require('../controllers/taskController');

// add new data
router.post('/imageUser', checkLogin , addTaskAndImage)
// add new data
router.post('/' , addData)
//get all data
router.get('/', checkLogin , getAllData)
//get single data 
router.get('/:id' , getDataByID)
//get single data by project ID
router.get('/project/:projectId' , getDataByProjectID)
//update single data 
router.put('/:id' , checkLogin , updateDataByID)
//delete single data 
router.delete('/:id' , deleteDataById)

module.exports = router;