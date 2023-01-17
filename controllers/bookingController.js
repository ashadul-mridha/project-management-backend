const db = require('../models');
const { Op } = require("sequelize");

/* This is importing the models from the database. */
const Booking = db.booking;
const BookingUser = db.bookingUser;
const User = db.user;



/**
 * It creates a meeting record in the database and then creates a meeting user record in the database.
 * @param req - The request object.
 * @param res - The response object.
 */
const addData = async (req,res) => {
    try {

        const bookingUser = [];
        bookingUser.push(req.user.id);

        /* Getting the users and project from the request body. */
        const reqUser = req.body.users;

        /* Pushing the user id into the meetingUser array that come via req. */
        if(reqUser){
            for (const user of reqUser) {
                bookingUser.push(user.id);
            }
        }

        /* Creating meeting table data with the properties of the request body. */
        const bookingData = {
            name : req.body.name,
            address : req.body.address,
            place : req.body.place,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            clientName : req.body.clientName,
            clientPhone : req.body.clientPhone,
            clientEmail : req.body.clientEmail,
            clientAddress : req.body.clientAddress,
            desc : req.body.desc,
            createdBy : req.user.id
        }       

        /* Creating a new meeting record in the database. */
        const bookingRes = await Booking.create(bookingData);

       /* Creating an array of objects that inset meetinguser table. */
        const bookingUsers = bookingUser.map( (user) => {
            return { userId : user , bookingId : bookingRes.id, createdBy : req.user.id  }
        })

       /* Creating a new record in the meetingUser table. */
        const newData = await BookingUser.bulkCreate(bookingUsers);
        

        res.send({
          status: true,
          message: "Booking Added Successfull",
          data : bookingRes,
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

        const data = await Booking.findAll({
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
        const data = await Booking.findOne({
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
        const data = await Booking.update( uploadData , { where : {id: id}})
        
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

        await Booking.destroy({ where : {id: id}})
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