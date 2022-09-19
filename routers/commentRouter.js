const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addData,
    getAllData,
    getDataByID,
    updateDataByID,
    deleteDataById
} = require('../controllers/commentController');

// add new data
router.post('/', checkLogin , addData)
//get all data
router.get('/', checkLogin , getAllData)
//get single data 
router.get('/:id', checkLogin , getDataByID)
//update single data 
router.put('/:id' , checkLogin , updateDataByID)
//delete single data 
router.delete('/:id', checkLogin , deleteDataById)

module.exports = router;