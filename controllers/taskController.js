const db = require('../models');
const path = require("path");
const fs = require("fs");
const uploadFolder = path.join( __dirname , '/../public/images/uploads/task');
const {genarateSlug, uploadFileName} = require('../utilities/utilitiesFunction');

//Import model
const { Op } = require("sequelize");
const Task = db.task;
const User = db.user;
const TaskUser = db.taskUser;
const TaskImage = db.taskImage;
const ProjectStatus = db.projectStatus;
const Project = db.project;
const Comment = db.comment;

//add task & task image and task user
const addTaskAndImage = async (req,res) => {
    try {
      
      // project assign users
      const assignUser = JSON.parse(req.body.assignUser);
      // genarate slug
      const slug = genarateSlug(req.body.name);

      // upload image to server


        // task insert data
        const taskData = {
          name: req.body.name,
          slug: slug,
          desc: req.body.desc,
          projectId: req.body.projectId,
          statusId: req.body.statusId,
          priority: req.body.priority,
          remain: req.body.remain,
          status: req.body.status ? req.body.status : false,
          createdBy : req.user.id 
        }
        //inset Task Data To Task Table
        const newTask = await Task.create(taskData);

        //genarate assign users data
        let taskUserData = assignUser.map( ( user) => {
            return { userId : user.id , taskId: newTask.id, createdBy : req.user.id  }
        })

        // insert task user to task_user table
        const taskUserRes = await TaskUser.bulkCreate(taskUserData);

        
        if(req.files){
          if(req.files.image.length){

            // store upload file name in array
              let uploadedFiles = [];
              const file = req.files.image;

              for(let i = 0 ; i < file.length; i++){

                  const UploadedFilName = file[i].name;

                  const finalFileName = uploadFileName(UploadedFilName);
                  
                  uploadedFiles.push(finalFileName);

                  const uploadPath = `${uploadFolder}/${finalFileName}`;
                  

                  file[i].mv( uploadPath , (err) => {
                      if (err) {
                          throw Error('File Not Uploaded')
                      } else {
                      }
                  })

              }

              const insertData = uploadedFiles?.map( (file) => {
                  return { taskId : newTask.id, image : file, createdBy: req.user.id};
              })

              //inset images data
              const taskMultiImage = await TaskImage.bulkCreate(insertData);

          } else {

              let finalFileName;

              //get files
              const imageFile = req.files.image;
              const UploadedFilName = imageFile.name;

              finalFileName = uploadFileName(UploadedFilName);

              const uploadPath = `${uploadFolder}/${finalFileName}`;

              imageFile.mv( uploadPath , (err) => {
                  if (err) {
                  throw Error('File Not Uploaded')
                  }
              })

              let data = {
                  taskId : newTask.id, image : finalFileName, createdBy: req.user.id
              }

              //inset task image
              const taskImage = await TaskImage.create(data);

          }
        }

        res.send({
          status: true,
          message: "Task Added Successfull",
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
        const data = await Task.findAll({
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          include: [{
            model: User,
            attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          }]
        });
        
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

//get all upcomming Task
const getUpcommingAllTask = async (req, res) => {
    try {
        const data = await Task.findAll({
          where : {
            remain : {
              [Op.gt]: new Date()
            }
          },
          
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          include: [{
            model: User,
            attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          }]
        });
        
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

//get all upcomming Task
const getTodayAllTask = async (req, res) => {
    try {
        const data = await Task.findAll({
          where : {
            remain : {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
          },
          
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          include: [{
            model: User,
            attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          }]
        });
        
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
        const data = await Task.findOne({
          where : {id: id},
          attributes: {exclude: ['createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
          include:[
            {
              model: TaskImage,
              attributes: {exclude: ['createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
            },
            {
              model: User,
              attributes: {exclude: ['createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
            },
            {
              model: Comment,
              attributes: {exclude: ['createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
            }
          ]
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
    addTaskAndImage,
    addData,
    getAllData,
    getUpcommingAllTask,
    getTodayAllTask,
    getDataByID,
    getDataByProjectID,
    updateDataByID,
    deleteDataById
}