import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST.trim(),
        port: process.env.EMAIL_PORT.trim(),
        auth: {
            user: process.env.EMAIL_USERNAME.trim(),
            pass: process.env.EMAIL_PASSWORD.trim(),
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: "Travel Map <travel@map.io>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);

};

export default sendEmail;