import { emails_pass, emails_user, SITE_NAME, ROOT } from "./settings.js";
import nodemailer from "nodemailer";
import { register_mail } from "./emails-tempates/register-email.js";
import { placed_order_email } from "./emails-tempates/orderplaced-email.js";
// activation_link
// let poolConfig = "smtps://username:password@smtp.example.com/?pool=true";
export const SendEmail = (email_data) => {
  if (email_data === "register-account") {
    var message = {
      from: "King luena",
      to: "bigbro4564@gmail.com",
      subject: "Email for testing",
      text: `go to the link and activation your account `,
      html: "sample message for testing....",
    };
  }

  let mailTransporter = nodemailer.createTransport({
    // service: "aliunlockers",
    // host: "smtp.mailtrap.io",
    // port: 26,
    // auth: {
    //   user: "fast_service@aliunlockers.com",
    //   pass: "Fxf1a(mwAPs[",
    // },
    // host: "mail.aliunlockers.com",
    // port: 587,
    // host: "smtp.aliunlockers.com",

    // port: 26,
    // secure: false, // upgrade later with STARTTLS
    service: "gmail",

    auth: {
      user: "fast_service@aliunlockers.com",
      pass: "4564@riverbend!",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  mailTransporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  mailTransporter.sendMail(message, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
SendEmail("register-account");
