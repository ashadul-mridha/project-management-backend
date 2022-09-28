const db = require('../models');
const { Op } = require("sequelize");

/* This is importing the models from the database. */
const Meeting = db.meeting;
const MeetingUser = db.meetingUser;
const Project = db.project;
const ProjectUser = db.projectUser;
const User = db.user;



/**
 * It creates a meeting record in the database and then creates a meeting user record in the database.
 * @param req - The request object.
 * @param res - The response object.
 */
const addData = async (req,res) => {
    try {

        const meetingUser = [];
        meetingUser.push(req.user.id);

        /* Getting the users and project from the request body. */
        const reqUser = req.body.users;
        const reqProject = req.body.project;

        /* Creating meeting table data with the properties of the request body. */
        const meetingData = {
            name : req.body.name,
            link : req.body.link,
            password : req.body.password,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            desc : req.body.desc,
            createdBy : req.user.id
        }       

        /* Creating a new meeting record in the database. */
        const meetingRes = await Meeting.create(meetingData);

        
        /* Getting the users from the project and Pushing the user id into the meetingUser array */
        if(reqProject){
            const projectUser = await ProjectUser.findAll({ where : {projectId: reqProject}, 
            attributes: {exclude: ['projectId','createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
            })

            for (const user of projectUser) {
                meetingUser.push(user.userId);
            }
        }

        /* Pushing the user id into the meetingUser array that come via req. */
        if(reqUser){
            for (const user of reqUser) {
                meetingUser.push(user.id);
            }
        }

        /* Removing duplicate user from the array. */
        const removeDuplicateUser = meetingUser.filter((user, index) => {
            return meetingUser.indexOf(user) === index;
        })

       /* Creating an array of objects that inset meetinguser table. */
        const meetingUsers = removeDuplicateUser.map( (user) => {
            return { userId : user , meetingId : meetingRes.id }
        })

       /* Creating a new record in the meetingUser table. */
        const newData = await MeetingUser.bulkCreate(meetingUsers);
        

        res.send({
          status: true,
          message: "Meeting Added Successfull",
          data : meetingRes,
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


/**
 * It gets all the meeting from the database and sends it to the frontend.
 * @param req - The request object.
 * @param res - The response object.
 */
const getAllData = async (req, res) => {
    try {

        const data = await Meeting.findAll({
          attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          order: [
            ["id", "ASC"],
          ],
          include: [{
            model: User,
            attributes: {exclude: ['meeting_user','createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
          }]
        });
        
        res.send({
          status: true,
          message: "Meeting Get Successfull",
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
        const data = await Meeting.findOne({
          where : {id: id},
          attributes: {exclude: ['createdBy','updatedBy','deletedBy', 'updatedAt','deletedAt']},
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
        const data = await Meeting.update( uploadData , { where : {id: id}})
        
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

        await Meeting.destroy({ where : {id: id}})
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