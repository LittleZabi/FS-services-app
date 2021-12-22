const { emails_pass, emails_user, SITE_NAME, ROOT } = require("./settings.js");
const nodemailer = require("nodemailer");
const { register_mail } = require("./emails-tempates/register-email.js");
const {
  placed_order_email,
} = require("./emails-tempates/orderplaced-email.js");

exports.SendEmail = function (email_data) {
  console.log("sending Email....");
  if (email_data.type === "order-placed") {
    var message = {
      from: SITE_NAME,
      to: email_data.order.email,
      subject: "Your Order Placed successfully!",
      text:
        `Your order successfully placed go to the link to see the progress condition any time  ` +
        email_data.order.link,
      html: placed_order_email({ ...email_data.order, SITE_NAME, ROOT }),
    };
  }
  if (email_data.type === "register-account") {
    var message = {
      from: SITE_NAME,
      to: email_data.register.email,
      subject: "Account Activation",
      text:
        `go to the link and activation your account ` +
        email_data.register.activation_link,
      html: register_mail({ ...email_data.register, SITE_NAME, ROOT }),
    };
  }

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emails_user,
      pass: emails_pass,
    },
  });
  mailTransporter.sendMail(message, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
