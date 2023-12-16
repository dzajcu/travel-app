import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST.trim(),
        port: process.env.EMAIL_PORT.trim(),
        auth: {
            user: process.env.EMAIL_USERNAME.trim(),
            pass: process.env.EMAIL_PASSWORD.trim(),
        },
    });

    const mailOptions = {
        from: "Travel Map <travel@map.io>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

};

export default sendEmail;