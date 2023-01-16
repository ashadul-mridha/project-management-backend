
const mailBody = async (data) => {

    return {
        from: '<ashadul@wasa.decode-lab.com>', // sender address
        to: 'ashadulmridhaprog@gmail.com',  // list of receivers
        subject: "Reset your Project Management password", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Link send?</b>", // html body
    }

    console.log(info);

}

module.exports = {
    mailBody
}