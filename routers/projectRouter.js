const router = require('express').Router();
const { checkLogin } = require('../middlewares/common/checkAuthorization');

//import all controller 

const{
    addProjectAllData,
    addData,
    getAllData,
    getAllDataByUser,
    getDataByID,
    getDataBySlug,
    getProjectUserByProjectId,
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
//get single data by id
router.get('/:id' , getDataByID)
//get project user by project id
router.get('/user/:id' , getProjectUserByProjectId)
//get single data by slug
router.get('/slug/:slug' , getDataBySlug)
//update single data 
router.put('/:id' , checkLogin , updateDataByID)
//delete single data 
router.delete('/:id' , deleteDataById)

module.exports = router;