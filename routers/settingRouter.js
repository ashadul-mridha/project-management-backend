const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addSetting,
    getAllData,
    getDataByID,
    updateDataByID,
    deleteDataById
} = require('../controllers/settingController');

// add new data
router.post('/' , addSetting)
//get all data
router.get('/', checkLogin , getAllData)
//get single data 
router.get('/:id' , getDataByID)
//update single data 
router.put('/:id' , updateDataByID)
//delete single data 
router.delete('/:id' , deleteDataById)

module.exports = router;