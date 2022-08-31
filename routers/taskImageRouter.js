const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addData,
    getAllData,
    getDataByID,
    updateDataByID,
    deleteDataById
} = require('../controllers/taskImageController');

// add new data
router.post('/' , checkLogin,  addData)
//get all data
router.get('/all', getAllData)
//get single data 
router.get('/:id' , getDataByID)
//update single data 
router.put('/:id' , updateDataByID)
//delete single data 
router.delete('/:id' , deleteDataById)

module.exports = router;