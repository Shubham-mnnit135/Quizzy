import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "quizzyforquiz@gmail.com",
      pass: "bedbbdexdiiwqqqi",
    },
  });
  
  export const sendMail = async(to,subject,text,html) => {
    const info = await transporter.sendMail({
      from: '"Quizzy for Quiz "<quizzyforquiz@gmail.com>', // sender address
      to,
      subject,
      text,
      html,
    });
  }