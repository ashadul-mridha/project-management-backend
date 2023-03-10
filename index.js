const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');

// import router
const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const projectStatusRouter = require('./routers/projectStatusRouter');
const taskRouter = require('./routers/taskRouter');
const taskImageRouter = require('./routers/taskImageRouter');
const settingRouter = require('./routers/settingRouter');
const commentRouter = require('./routers/commentRouter');
const meetingRouter = require('./routers/meetingRouter');
const bookingRouter = require('./routers/bookingRouter');

//import middleware
const { notFoundhandler,  defaultErrorHandler } = require('./middlewares/common/errorHandler');

const app = express();

//data parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//application middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));


//all router
app.use('/api/user' , userRouter);
app.use('/api/project' , projectRouter);
app.use('/api/projectStatus' , projectStatusRouter);
app.use('/api/task' , taskRouter);
app.use('/api/task/image' , taskImageRouter);
app.use('/api/setting' , settingRouter);
app.use('/api/comment' , commentRouter);
app.use('/api/meeting' , meetingRouter);
app.use('/api/booking' , bookingRouter);

//testing api
app.get('/' , (req , res) => {
    res.send({message : "Hello Todoest Server"});
})


//not found handler
app.use(notFoundhandler);

//common error handler
app.use(defaultErrorHandler);

// application listen
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT , () => {
    console.log(`app running on port ${PORT}`);
})

