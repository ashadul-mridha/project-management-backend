const db = require('../models');
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const uploadFolder = path.join( __dirname , '/../public/images/uploads/user');
const nodemailer = require("nodemailer");
const smtpConfig = require("../config/smtpConfig");

//Import model
const User = db.user;
const ForgotPass = db.forgotPass;
const Meeting = db.meeting;
const Booking = db.booking;
const Project = db.project;
const ProjectStatus = db.projectStatus;
const Task = db.task;
const TaskImage = db.taskImage;
const TaskUser = db.taskUser;

// crypto secreate
const cryptoSecret = process.env.CRYPTO_SECRET;

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
								phone:req.body.phone,
								address:req.body.address,
								image: finalFileName,
								active: true
								// active: req.body.active ? req.body.active : false
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
				message: err?.message,
				data : null,
				statusCode: 500
		})

	}

}

//forgot password email come
const forgotPassword = async (req, res) => {

	try {
		// find a user who has this email/username
		const user = await User.findOne({ where : {email: req.body.email , active : true}})

		if (user && user.id) {

			//  generated random string
			const randomStr = (Math.random() * 5).toString(36).substring(2);
			//generated random string hashed
			const hashedRandomString =CryptoJS.AES.encrypt(randomStr , cryptoSecret ).toString();

			// genarate expaire time current time + 30 minutes
			const expaireTime =  new Date( new Date().getTime() + 30 * 60000);

			const insertData = {
				userId : user.id,
				token: randomStr,
				expaireIn : expaireTime
			}

			// genarate reset password link
			const resetPasswordLink = `http://localhost:3000/reset/password?reset_token=${hashedRandomString}`

			//find user request before or not
			const findForgotPassAvailable = await ForgotPass.findOne({ where : { userId: user.id }});

			if (findForgotPassAvailable) {

				const forgotDatainsert = await ForgotPass.update( insertData , {
						where: { id : findForgotPassAvailable.id }
				});

				if (forgotDatainsert) {

					// create transport and verify
					let transporter = nodemailer.createTransport(smtpConfig);
        			const verifyTranspoter = await transporter.verify();

					if (verifyTranspoter) {

						const sendmail = async () => {

							let info = await transporter.sendMail({
								from: '<ashadul@wasa.decode-lab.com>', // sender address
								to: user.email,  // list of receivers
								subject: "Reset your Project Management password", // Subject line
								html: `
								<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
				
									<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
										style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
										<tr>
											<td>
												<table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
													align="center" cellpadding="0" cellspacing="0">
													<tr>
														<td style="height:80px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="text-align:center;">
														<a href="https://decode-lab.com" title="logo" target="_blank">
															<img width="80" src="https://i.ibb.co/Rh3XBsf/decode-lab.png" title="logo" alt="logo">
														</a>
														</td>
													</tr>
													<tr>
														<td style="height:20px;">&nbsp;</td>
													</tr>
													<tr>
														<td>
															<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
																style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
																<tr>
																	<td style="height:40px;">&nbsp;</td>
																</tr>
																<tr>
																	<td style="padding:0 35px;">
																		<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">${user.name} you have
																			requested to reset your password</h1>
																		<span
																			style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
																			We cannot simply send you your old password. A unique link to reset your
																			password has been generated for you. To reset your password, click the
																			following link and follow the instructions.
																		</p>
																		<a href=${resetPasswordLink}
																			style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
																			Password</a>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin-top: 17px;">
																			If you didn’t request a password reset, ignore this email. Your password will stay the same.
																		</p>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin-top: 17px; text-align: left;">
																			Productively, </br> The Decode Lab Team
																		</p>
																	
																	</td>
																
																</tr>
																<tr>
																	<td style="height:40px;">&nbsp;</td>
																</tr>
															</table>
														</td>
													<tr>
														<td style="height:20px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="text-align:center;">
															<p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.decode-lab.com</strong></p>
														</td>
													</tr>
													<tr>
														<td style="height:80px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</body>
								`
							});

							if (info.response) {
								res.send({
										status: true,
										message: "email sent successfull",
										data : resetPasswordLink,
										statusCode: 200
								})
							}

						}
						sendmail();
					}

				}

			} else {

				const forgotDatainsert = await ForgotPass.create( insertData );

				if (forgotDatainsert) {

					// create transport and verify
					let transporter = nodemailer.createTransport(smtpConfig);
        			const verifyTranspoter = await transporter.verify();

					if (verifyTranspoter) {

						const sendmail = async () => {

							let info = await transporter.sendMail({
								from: '<ashadul@wasa.decode-lab.com>', // sender address
								to: user.email,  // list of receivers
								subject: "Reset your Project Management password", // Subject line
								html: `
								<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
				
									<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
										style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
										<tr>
											<td>
												<table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
													align="center" cellpadding="0" cellspacing="0">
													<tr>
														<td style="height:80px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="text-align:center;">
														<a href="https://decode-lab.com" title="logo" target="_blank">
															<img width="80" src="https://i.ibb.co/Rh3XBsf/decode-lab.png" title="logo" alt="logo">
														</a>
														</td>
													</tr>
													<tr>
														<td style="height:20px;">&nbsp;</td>
													</tr>
													<tr>
														<td>
															<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
																style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
																<tr>
																	<td style="height:40px;">&nbsp;</td>
																</tr>
																<tr>
																	<td style="padding:0 35px;">
																		<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">${user.name} you have
																			requested to reset your password</h1>
																		<span
																			style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
																			We cannot simply send you your old password. A unique link to reset your
																			password has been generated for you. To reset your password, click the
																			following link and follow the instructions.
																		</p>
																		<a href=${resetPasswordLink}
																			style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
																			Password</a>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin-top: 17px;">
																			If you didn’t request a password reset, ignore this email. Your password will stay the same.
																		</p>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin-top: 17px; text-align: left;">
																			Productively, </br> The Decode Lab Team
																		</p>
																	
																	</td>
																
																</tr>
																<tr>
																	<td style="height:40px;">&nbsp;</td>
																</tr>
															</table>
														</td>
													<tr>
														<td style="height:20px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="text-align:center;">
															<p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.decode-lab.com</strong></p>
														</td>
													</tr>
													<tr>
														<td style="height:80px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</body>
								`
							});

							if (info.response) {
								res.send({
										status: true,
										message: "email sent successfull",
										data : resetPasswordLink,
										statusCode: 200
								})
							}

						}
						sendmail();
					}

				}

		}
		}  else {

				res.send({
						status: false,
						message: "email was wrong! Please try again.",
						data : null,
						statusCode: 500
				})

		}
	} catch (err) {

		res.send({
				status: false,
				message: err?.message,
				data : null,
				statusCode: 500
		})

	}

}

//reset password
const resetPassword = async ( req, res) => {
	try {

		// decrypt token
		const  token  = CryptoJS.AES.decrypt( req.body.token , cryptoSecret).toString(CryptoJS.enc.Utf8);

		//find token user
		const tokenUser = await ForgotPass.findOne({ where : {token: token}});

		if (tokenUser && tokenUser.userId) {

			// password generated hashed
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const updateData = { password: hashedPassword}

			const tokenUserPassChange = await User.update( updateData , {
				where: { id : tokenUser.userId }
			});

				res.send({
                    status: true,
                    message: "password reset successfull",
                    data : tokenUserPassChange,
                    statusCode: 200
				})

		} else {

			res.send({
                status: true,
                message: "token was invalid",
                data : token,
                statusCode: 200
			})

		}

	} catch (error) {

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
					attributes: ['id', 'name', 'phone', 'address', 'email', 'userRole','image', 'active', 'createdAt'],
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

//get user by id include project
const getDataByID = async (req, res) => {
		try {
				const {id} = req.params;

				const data = await User.findOne({
					where : { id : id},
					attributes: ['id' ,'name', 'phone', 'address', 'email', 'userRole','image', 'active'],
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

//Update single data by using id
const updateUserById = async (req,res) => {
		try {
				//update id
				const {id} = req.params;

				const storedData = await User.findOne({ where : {id: id}})
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

				const uploadData = {
					name : req.body.name,
					phone: req.body.phone,
					email: req.body.email,
					address: req.body.address,
					image : finalFileName,
					active: req.body.active,
					userRole : req.body.userRole,
				}



				//update data
				const data = await User.update( uploadData , { where : {id: id}})

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


//get user by id include project
const getProjectByUserID = async (req, res) => {
		try {

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[
						{
							model: Project,
							order: [
								["id", "ASC"],
							],
							attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							include:[{
								model: ProjectStatus ,
								order: [
									["id", "ASC"],
								],
								separate: true,
								attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
								include : [{
									model: Task,
									include : [{
										model: TaskUser,
										where: {
												userId: req.user.id
										},
										include : [{
											model: Task,
											attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},

										}],
										attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},

									}],
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},

								}]
							}]
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

//get user by id include meeting
const getMeetingByUserID = async (req, res) => {
		try {

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[
						{
							model: Meeting,
							order: [
								["id", "ASC"],
							],
							attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							include :[
							{
									model: User,
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							}
						]
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

//get user by id include booking
const getBookingByUserID = async (req, res) => {
		try {

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[
						{
							model: Booking,
							order: [
								["id", "ASC"],
							],
							attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							include :[
							{
									model: User,
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							}
						]
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


//get user by id include project
const getProjectBySlugAndUserID = async (req, res) => {
		try {


				const {slug} = req.params;

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[
						{
							model: Project,
							where: {
								slug: slug
							},
							order: [
								["id", "ASC"],
							],
							attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							include:[{
								model: ProjectStatus ,
								order: [
									["id", "ASC"],
								],
								separate: true,
								attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
								include : [{
									model: Task,
									include : [{
										model: TaskUser,
										where: {
												userId: req.user.id
										},
										include : [{
											model: Task,
											attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},

										}],
										attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},

									}],
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},

								}]
							}]
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

//get tasks by user id
const getTaskByUserID = async (req, res) => {
		try {
				// const {id} = req.params;

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[{
						model: Task,
						attributes: {
							include: [ 'id','name', 'slug','desc', 'priority', 'end_time']
						} ,
						include :[
							{
								model: TaskImage,
								attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							},
							{
									model: User,
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							}
						]
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


//get today tasks by user id
const getTodayTaskByUserID = async (req, res) => {
		try {
				// const {id} = req.params;

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[{
						model: Task,
						where : {
							end_time : {
								[Op.lt]: new Date(),
								[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
							}
						},
						attributes: {
							include: [ 'id','name', 'slug','desc', 'priority', 'end_time']
						} ,
						include :[
							{
								model: TaskImage,
								attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							},
							{
									model: User,
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							}
						]
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

//get today tasks by user id
const getUpcommingTaskByUserID = async (req, res) => {
		try {
				// const {id} = req.params;

				const data = await User.findOne({
					where : { id : req.user.id},
					attributes: ['id' ,'name', 'email', 'userRole','image'],
					include:[{
						model: Task,
						where : {
							end_time : {
								[Op.gt]: new Date()
							}
						},
						attributes: {
							include: [ 'id','name', 'slug','desc', 'priority', 'end_time']
						} ,
						include :[
							{
								model: TaskImage,
								attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							},
							{
									model: User,
									attributes: {exclude: ['createdBy','updatedBy','deletedBy','createdAt','updatedAt','deletedAt']},
							}
						]
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

//send mail ok
const sendMail = async (req, res) => {

    try {

        let transporter = nodemailer.createTransport(smtpConfig);

        const verifyTranspoter = await transporter.verify();

        if (verifyTranspoter) {

            const sendmail = async () => {
                const link = 'http://localhost:3000/reset/password'

                let info = await transporter.sendMail({
                    from: '<ashadul@wasa.decode-lab.com>', // sender address
                    to: 'ashadulmridhaprog@gmail.com',  // list of receivers
                    subject: "Reset your Project Management password", // Subject line
   					html: `
					<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    
						<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
							style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
							<tr>
								<td>
									<table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
										align="center" cellpadding="0" cellspacing="0">
										<tr>
											<td style="height:80px;">&nbsp;</td>
										</tr>
										<tr>
											<td style="text-align:center;">
											<a href="https://rakeshmandal.com" title="logo" target="_blank">
												<img width="80" src="https://i.ibb.co/Rh3XBsf/decode-lab.png" title="logo" alt="logo">
											</a>
											</td>
										</tr>
										<tr>
											<td style="height:20px;">&nbsp;</td>
										</tr>
										<tr>
											<td>
												<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
													style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
													<tr>
														<td style="height:40px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="padding:0 35px;">
															<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
																requested to reset your password</h1>
															<span
																style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
															<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
																We cannot simply send you your old password. A unique link to reset your
																password has been generated for you. To reset your password, click the
																following link and follow the instructions.
															</p>
															<a href="javascript:void(0);"
																style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
																Password</a>
															<p style="color:#455056; font-size:15px;line-height:24px; margin-top: 17px;">
																If you didn’t request a password reset, ignore this email. Your password will stay the same.
															</p>
															<p style="color:#455056; font-size:15px;line-height:24px; margin-top: 17px; text-align: left;">
																Productively, </br> The Decode Lab Team
															</p>
														
														</td>
													
													</tr>
													<tr>
														<td style="height:40px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										<tr>
											<td style="height:20px;">&nbsp;</td>
										</tr>
										<tr>
											<td style="text-align:center;">
												<p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.decode-lab.com</strong></p>
											</td>
										</tr>
										<tr>
											<td style="height:80px;">&nbsp;</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</body>
					`
                });

                if (info.response) {
                    res.send({
                        status: true,
                        message: "Data Get Successfull",
                        data : info,
                        statusCode: 200
                    })
                }

            }
            sendmail();
        }

    } catch (error) {
        res.send({
            status: false,
            message: error.message,
            data : null,
            statusCode: 500
        })
    }

    

    
    

// 	transporter.verify(function (error, success) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		try {

//             const mailInfo = {
//                 mail : 'ashadulmridhaprog@gmail.com'
//             }

// 		const sendmail = async () => {

// 			let info = await transporter.sendMail({
//                 from: '<ashadul@wasa.decode-lab.com>', // sender address
//                 to: 'ashadulmridhaprog@gmail.com',  // list of receivers
//                 subject: "Reset your Project Management password", // Subject line
//                 text: "Hello world?", // plain text body
//                 html: "<b>Link send?</b>", // html body
//             });

// 			console.log(info);

// 		}
// 		sendmail();

// 		res.send('success send email')
// 		} catch (error) {
// 			console.log(error);
// 	}
// }})

}


module.exports = {
		registrationUser,
		loginUser,
		forgotPassword,
		resetPassword,
		getAllData,
		getDataByID,
		updateUserById,
		getProjectByUserID,
		getMeetingByUserID,
		getBookingByUserID,
		getProjectBySlugAndUserID,
		getTaskByUserID,
		getTodayTaskByUserID,
		getUpcommingTaskByUserID,
		sendMail
}