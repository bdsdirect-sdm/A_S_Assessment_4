import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: 'anuragsharda131@gmail.com',
        pass: "ousbpkkzrkospnso"
    }
});

export default transporter;