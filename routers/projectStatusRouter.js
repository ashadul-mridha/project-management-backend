const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addData,
    getAllData,
    getDataByID,
    updateDataByID,
    deleteDataById
} = require('../controllers/projectStatusController');

// add new data
router.post('/' , addData)
//get all data
router.get('/', checkLogin , getAllData)
//get single data 
router.get('/:id' , getDataByID)
//update single data 
router.put('/:id' , checkLogin , updateDataByID)
//delete single data 
router.delete('/:id' , deleteDataById)

module.exports = router;