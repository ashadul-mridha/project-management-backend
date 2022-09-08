const db = require('../models');
const path = require("path");
const fs = require("fs");
const uploadFolder = path.join( __dirname , '/../public/images/uploads/project');
const { genarateSlug, uploadFileName } = require('../utilities/utilitiesFunction');

//Import model
const Project = db.project;
const ProjectStatus = db.projectStatus;
const ProjectUser = db.projectUser;
const Task = db.task;


//const add new data
const addProjectAllData = async (req,res) => {
    try {

      //assign users
      const project_status = JSON.parse(req.body.project_status);
      const assignUser = JSON.parse(req.body.assignUser);
      const name = req.body.name ;

      let finalFileName;

      if (req.files) {

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

      }

      // genarate slug
      const slug = genarateSlug(name);

        let projectData = {
            name,
            slug: slug,
            image: finalFileName,
            status: req.body.status ? req.body.status : false
        }
        // add project
        const projectRes = await Project.create(projectData);


        //genarate status data
        let projectStatusData = project_status.map( ( status) => {
            return {...status, projectId: projectRes.id, status: status.status ? status.status : false}
        })
        //inset project status
        const statusRes = await ProjectStatus.bulkCreate(projectStatusData);
        

        //genarate assign users
        let projectuserData = assignUser.map( ( user) => {
            return { userId : user.id , projectId: projectRes.id, createdBy : req.user.id }
        })
        //inset project status
        const projectuserRes = await ProjectUser.bulkCreate(projectuserData);


        res.send({
          status: true,
          message: "Project Data Added successfull",
          data : projectRes,
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

//const add new data
const addData = async (req,res) => {
    try {

      let finalFileName;

      if (req.files) {

          //get files
          const imageFile = req.files.image;
          const UploadedFilName = imageFile.name;

          const fileExt = path.extname(UploadedFilName);
          const fileNameWithoutExt =
            UploadedFilName
              .replace(fileExt, "")
              .toLowerCase()
              .split(" ")
              .join("-") +
            "-" +
            Date.now();

          finalFileName = fileNameWithoutExt + fileExt;

          const uploadPath = `${uploadFolder}/${finalFileName}`;

        //   console.log(uploadPath);

          imageFile.mv( uploadPath , (err) => {
            if (err) {
              throw Error('File Not Uploaded')
            }
          })

      }

      // genarate slug
      const slug = genarateSlug(req.body.name);

        let data = {
            ...req.body,
            slug: slug,
            image: finalFileName,
            status: req.body.status ? req.body.status : false
        }

        //inset about us data
        const newData = await Project.create(data);

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
        const data = await Project.findAll({
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          include:[{
            model: ProjectStatus ,
            attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            include :{
              model: Task,
              attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            }
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

//get all data by user
const getAllDataByUser = async (req, res) => {
    try {
        const data = await Project.findAll({
          where : {id : req.user.id},
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          include:[{
            model: ProjectStatus ,
            attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            include :{
              model: Task,
              attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            }
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
        const data = await Project.findOne({ where : {id: id}, 
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          include:[{
            model: ProjectStatus ,
            attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            include :{
              model: Task,
              attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            }
          }]

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

        const storedData = await Project.findOne({ where : {id: id}})
        let finalFileName = storedData.image;

        //delete and store new image
        if(req.files){

            //deleted 1st image
            fs.unlink(`${uploadFolder}/${storedData.image}`, (err) => {
              if(err){
                throw Error('Image Not Deleted')
              } else {
                console.log('img deleted');
              }
            })

            //store new image

            //get files
            const imageFile = req.files.image;
            const UploadedFilName = imageFile.name;

            const fileExt = path.extname(UploadedFilName);
            const fileNameWithoutExt =
            UploadedFilName
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
            "-" +
            Date.now();

            finalFileName = fileNameWithoutExt + fileExt;

            const uploadPath = `${uploadFolder}/${finalFileName}`;

            imageFile.mv( uploadPath , (err) => {
                if (err) {
                    throw Error('File Not Uploaded')
                }else {
                    console.log('file uploaded');
                }
            })

        }

        const uploadData = { ...req.body , image : finalFileName}


        //update data
        const data = await Project.update( uploadData , { where : {id: id}})
        
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
        const data = await Project.findOne({ where : {id: id}})
        if(data.image){
            fs.unlink(`${uploadFolder}/${data.image}`, (err) => {
              if(err){
                throw Error('Image Not Deleted')
              } else {
                
              }
            })
        }
        await Project.destroy({ where : {id: id}})
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
    addProjectAllData,
    addData,
    getAllData,
    getAllDataByUser,
    getDataByID,
    updateDataByID,
    deleteDataById
}