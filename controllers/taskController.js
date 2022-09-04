const db = require('../models');
const {genarateSlug} = require('../utilities/utilitiesFunction');

//Import model
const Task = db.task;
const ProjectStatus = db.projectStatus;
const Project = db.project;
const TaskImage = db.taskImage;

//const add new hero section data
const addData = async (req,res) => {
    try {

      // genarate slug
      const slug = genarateSlug(req.body.name);

        const data = {
          ...req.body,
          slug: slug,
          status: req.body.status ? req.body.status : false
        }
        //inset about us data
        const newData = await Task.create(data);

        res.send({
          status: true,
          message: "Data Added Successfull",
          data : newData,
          statusCode: 200
        })

    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 
    }
}

//get all data
const getAllData = async (req, res) => {
    try {
        const data = await Task.findAll({});

        console.log(req.user);
        
        res.send({
          status: true,
          message: "Data Get Successfull",
          data : data,
          statusCode: 200
        })

    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        })
    }
}

//get single data
const getDataByID = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await Task.findOne({ where : {id: id}, 
          include:[{model: TaskImage}]
        })
        res.send({
          status: true,
          message: "Data Get Successfull",
          data : data,
          statusCode: 200
        })
    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 
    }
}

//get data by project id
const getDataByProjectID = async (req, res) => {
    try {
        const {projectId} = req.params;
        const data = await Task.findAll({ 
          where : {projectId: projectId},
          include:[{model: Project}, {model: ProjectStatus}]
        })

        res.send({
          status: true,
          message: "Data Get Successfull",
          data : data,
          statusCode: 200
        })
    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 
    }
}

//Update single data by using id
const updateDataByID = async (req,res) => {
    try {
        //update id
        const {id} = req.params;
        
      // genarate slug
      const slug = genarateSlug(req.body.name);

        const uploadData = { ...req.body, slug }

        //update data
        const data = await Task.update( uploadData , { where : {id: id}})
        
        res.send({
          status: true,
          message: "Data Update Successfull",
          data : data,
          statusCode: 200
        })

    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 
    }
}

//delete single data by using id
const deleteDataById = async (req,res) => {
    try {
        const {id} = req.params;

        await Task.destroy({ where : {id: id}})
        res.status(200).send('About Us Delete Successfully');

    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 
    }
}

module.exports = {
    addData,
    getAllData,
    getDataByID,
    getDataByProjectID,
    updateDataByID,
    deleteDataById
}