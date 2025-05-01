"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer = require('nodemailer');
async function sendEmail(email, subject, body) {
    const systemEmailHost = process.env.SYSTEM_EMAIL_HOST;
    const systemEmailPort = process.env.SYSTEM_EMAIL_PORT;
    const systemEmailAddress = process.env.SYSTEM_EMAIL_ADDRESS ?? '';
    const systemEmailPassword = process.env.SYSTEM_EMAIL_PASSWORD;
    const transporter = nodemailer.createTransport({
        host: systemEmailHost,
        port: systemEmailPort,
        auth: {
            user: systemEmailAddress,
            pass: systemEmailPassword,
        }
    });
    const mailOptions = {
        from: `"TripWise" <support@tripwise.group>`,
        to: email,
        subject,
        html: body,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', email);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
