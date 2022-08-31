const db = require('../models');
const path = require("path");
const fs = require("fs");
const uploadFolder = path.join( __dirname , '/../public/images/uploads/task');

//Import model
const TaskImage = db.taskImage;

//const add new hero section data
const addData = async (req,res) => {
    try {

        const uploadedFiles = [];

        if(req.files){

            const file = req.files.image;

            for(let i = 0 ; i < file.length; i++){

                const UploadedFilName = file[i].name;

                const fileExt = path.extname(UploadedFilName);
                const fileNameWithoutExt =
                    UploadedFilName
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                    "-" +
                    Date.now();

                const finalFileName = fileNameWithoutExt + fileExt;

                uploadedFiles.push(finalFileName);

                const uploadPath = `${uploadFolder}/${finalFileName}`;

                file[i].mv( uploadPath , (err) => {
                    if (err) {
                        throw Error('File Not Uploaded')
                    }
                })

            }
        }

        const insertData = uploadedFiles?.map( (file) => {
            return { taskId : req.body.taskId, image : file, createdBy: req.user.id};
        })

        //inset images data
        const newData = await TaskImage.bulkCreate(insertData);


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

        const data = await TaskImage.findAll({});

        res.send({
          status: true,
          message: "Data get successfull",
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
        const data = await TaskImage.findOne({ where : {id: id} })
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

        const storedData = await TaskImage.findOne({ where : {id: id}})
        let finalFileName = storedData.image;

        //delete and store new image
        // if(req.files){

        //     //deleted 1st image
        //     fs.unlink(`${uploadFolder}/${storedData.image}`, (err) => {
        //       if(err){
        //         throw Error('Image Not Deleted')
        //       } else {
        //         console.log('img deleted');
        //       }
        //     })

        //     //store new image

        //     //get files
        //     const imageFile = req.files.image;
        //     const UploadedFilName = imageFile.name;

        //     const fileExt = path.extname(UploadedFilName);
        //     const fileNameWithoutExt =
        //     UploadedFilName
        //         .replace(fileExt, "")
        //         .toLowerCase()
        //         .split(" ")
        //         .join("-") +
        //     "-" +
        //     Date.now();

        //     finalFileName = fileNameWithoutExt + fileExt;

        //     const uploadPath = `${uploadFolder}/${finalFileName}`;

        //     imageFile.mv( uploadPath , (err) => {
        //         if (err) {
        //             throw Error('File Not Uploaded')
        //         }else {
        //             console.log('file uploaded');
        //         }
        //     })

        // }

        // const uploadData = { ...req.body , image : finalFileName}


        //update data
        // const data = await TaskImage.update( uploadData , { where : {id: id}})
        
        res.send({
          status: true,
          message: "Data Update Successfull",
          data : id,
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
        const data = await TaskImage.findOne({ where : {id: id}})
        if(data.image){
            fs.unlink(`${uploadFolder}/${data.image}`, (err) => {
              if(err){
                throw Error('Image Not Deleted')
              } else {
                
              }
            })
        }
        await TaskImage.destroy({ where : {id: id}})
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
    updateDataByID,
    deleteDataById
}