// import { Injectable } from "@nestjs/common";
// import * as nodemailer from "nodemailer"

// @Injectable()
// export class EmailService {
//   private transporter: nodemailer.Transport;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//       },
//     });
//   }

//   async sendEmail(to: string, subject: string, context: string){
//     const mailOptions = {
//       to,
//       subject,
//       text: context
//     }
//   }
// }
