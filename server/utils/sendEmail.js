const nodemailer =  require("nodemailer");

const sendEmail= async(to, subject, html)=>{
    const transport =nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    });

    await transport.sendMail({
       from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html,

    });
    
};
module.exports=sendEmail;