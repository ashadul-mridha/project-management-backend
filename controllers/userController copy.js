const db = require('../models');
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const uploadFolder = path.join( __dirname , '/../public/images/uploads/user');
const nodemailer = require("nodemailer");
const smtpConfig = require("../config/smtpConfig");

//Import model
const User = db.user;
const Project = db.project;

//const add new hero section data
const registrationUser = async (req,res) => {
    try {

        //find user have or not
        const findUser = await User.findOne({ where : {email: req.body.email}})

        if (findUser) {
            res.status(409).send({
                status: false,
                message: "use another email this email used before",
                data: null,
                statusCode: 409
            })
        } else{

            // password generated hashed
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //upload image to server and get name
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


            imageFile.mv( uploadPath , (err) => {
                if (err) {
                throw Error('File Not Uploaded')
                }
            })

            }

            let data = {
                name:req.body.name,
                email:req.body.email,
                password : hashedPassword,
                userRole : req.body.userRole ? req.body.userRole : 'user',
                image: finalFileName,
                active: req.body.active ? req.body.active : false
            }

            //inset about us data
            const newUserData = await User.create(data);

            res.status(200).send({
                status: true,
                message: "Data Added Successfull",
                data : newUserData,
                statusCode: 200
            })
        }

      

    } catch (error) {
        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 
    }
}

//login user
 const loginUser =  async (req, res) => {

  try {
    // find a user who has this email/username
    const user = await User.findOne({ where : {email: req.body.email , active : true}})

    if (user && user.id) {

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          userid: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          userRole: user.userRole
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        const data ={ ...userObject , jwtToken: token }

        res.send({
            status: true,
            message: "data fetch successfull",
            data : data,
            statusCode: 200
        })

      } else {
        res.send({
            status: false,
            message: "Login failed! Please try again.",
            data : null,
            statusCode: 500
        })
      }
    } else {
      res.send({
          status: false,
          message: "Login failed! Please try again.",
          data : null,
          statusCode: 500
      })
    }
  } catch (err) {
    
    res.send({
        status: false,
        message: error?.message,
        data : null,
        statusCode: 500
    })

  }
}

//get all data
const getAllData = async (req, res) => {
    try {
        const data = await User.findAll({
          attributes: ['id', 'name', 'email', 'userRole','image'],
          where: {
            email: {
              [Op.not]: 'admin@gmail.com'
            }
          }
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


//get all data
const getDataByID = async (req, res) => {
    try {
        const {id} = req.params;

        const data = await User.findOne({
          where : { id : id},
          attributes: ['name', 'email', 'userRole','image'],
          include:[{model: Project, attributes: ['name', 'slug','image'] }]
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

//send mail ok
const sendMail = async (req, res) => {

  
  let transporter = nodemailer.createTransport({
    pool: smtpConfig.pool,
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.auth.user, 
      pass: smtpConfig.auth.pass
    },
  });


  transporter.verify(function (error, success) {
  if (error) {
    res.send({
      status: false,
      message: error.message,
      data : null,
      statusCode: 500
    })
  } else {

    try {

      const sendmail = async () => {

        let info = await transporter.sendMail({
          from: '<node@test.amaderrel.com>',
          to: " ashadulmridhaprog@gmail.com",
          text: 'For clients with plaintext support only',
          html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
          amp: `<!doctype html>
          <html ⚡4email>
            <head>
              <meta charset="utf-8">
              <style amp4email-boilerplate>body{visibility:hidden}</style>
              <script async src="https://cdn.ampproject.org/v0.js"></script>
              <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            </head>
            <body>
              <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
              <p>GIF (requires "amp-anim" script in header):<br/>
                <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
            </body>
          </html>`
        });

        console.log(info);

      }
    sendmail();
    
    res.send('success')
    } catch (error) {
      res.send({
        status: false,
        message: error.message,
        data : null,
        statusCode: 500
      })
    }
}})
  
}


module.exports = {
    registrationUser,
    loginUser,
    getAllData,
    getDataByID,
    sendMail
}