const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addProjectAllData,
    addData,
    getAllData,
    getAllDataByUser,
    getDataByID,
    updateDataByID,
    deleteDataById
} = require('../controllers/projectController');

// add new data
router.post('/all', checkLogin, addProjectAllData)
// add new data
router.post('/' , addData)
//get all data
router.get('/', checkLogin , getAllData)
//get all data by user
router.get('/user', checkLogin , getAllDataByUser)
//get single data 
router.get('/:id' , getDataByID)
//update single data 
router.put('/:id' , checkLogin , updateDataByID)
//delete single data 
router.delete('/:id' , deleteDataById)

module.exports = router;