const db = require('../models');

//Import model
const Comment = db.comment;
const User = db.user;

//const add new hero section data
const addData = async (req,res) => {
    try {

        //inset data
        const newData = await Comment.create(req.body);

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
        const data = await Comment.findAll({
            attributes: {exclude: ['createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
            include: [
                {
                    model : User,
                    attributes: {exclude: ['password','createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
                }
            ]
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
        const data = await Comment.findOne({ where : {id: id} })
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
        const data = await Comment.update( uploadData , { where : {id: id}})
        
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

        //set who delete
        await Comment.update( { deletedBy : req.user.id} , { where : {id: id}});

        await Comment.destroy({ where : {id: id}});
        
        res.send({
          status: true,
          message: 'Comment has been delete',
          statusCode: 500
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

module.exports = {
    addData,
    getAllData,
    getDataByID,
    updateDataByID,
    deleteDataById
}