const express = require("express");
const db = require("./database.js");
const bodyParser = require("body-parser");
const { _hashes_, randoms } = require("./functions.js");
const { SendEmail } = require("./emails.js");
const { ROOT } = require("./settings.js");
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get("/api/gen-pass/:pass", (req, res) => {
  const pass = req.params.pass;
  res.send(_hashes_(pass));
});

server.get("/api/currencyExchangeApiKey/:convert", (req, res) => {
  const convert = req.params.convert;
  const url = `https://free.currconv.com/api/v7/convert?q=${convert}&compact=ultra&apiKey=fd0f4dc25bac27167fb8`;
  res.send(url);
});

server.post("/api/order-history/", (req, res) => {
  const { user } = req.body;
  const sql = "SELECT `slug` FROM `orders` WHERE `user` = ?";
  db.query(sql, [user], (err, suc) => {
    if (err) throw err;
    if (suc.length > 0) {
      const sql =
        "SELECT `orders`.*, `services_list`.`price`,`services_list`.`deli_time`, services_category.category as categ_name FROM  `orders`,  `services_list`, services_category WHERE  `orders`.`user` = ? AND `services_list`.`srvc_slug` = `orders`.`service` AND `orders`.`category` = `services_category`.`slug` ORDER BY `orders`.`id` DESC";
      db.query(sql, [user], (err, succ) => {
        if (err) throw err;
        if (succ.length > 0) {
          res.send({ condition: "success", order: succ });
        } else {
          res.send({ condition: "noOrdersFound" });
        }
      });
    } else {
      res.send({ condition: "OrderNotExist" });
    }
  });
});

server.post("/api/order-details/", (req, res) => {
  const { order_slug, user } = req.body;
  const sql = "SELECT `id` FROM `orders` WHERE `user` = ?";
  db.query(sql, [user], (err, suc) => {
    if (err) throw err;
    if (suc.length > 0) {
      const sql =
        "SELECT `orders`.*, `services_list`.`price`,`services_list`.`deli_time`, services_category.category as categ_name FROM  `orders`,  `services_list`, services_category WHERE `orders`.`id` = ? AND `orders`.`user` = ? AND `services_list`.`srvc_slug` = `orders`.`service` AND `orders`.`category` = `services_category`.`slug`";
      db.query(sql, [order_slug, user], (err, succ) => {
        if (err) throw err;
        if (succ.length > 0) {
          res.send({ condition: "success", order: succ });
        } else {
          res.send({ condition: "noOrdersFound" });
        }
      });
    } else {
      res.send({ condition: "OrderNotExist" });
    }
  });
});

const port = process.env.PORT || 1206;
server.post("/api/feedback/", (req, res) => {
  const { email, message, username } = req.body.values;
  const slug = randoms(15);
  const sql =
    "INSERT INTO `contact` (`email`, `username`, `text`, `slug`) VALUES(?, ?, ?, ?)";
  db.query(sql, [email, username, message, slug], (err, succ) => {
    if (err) throw err;
    res.send({ condition: "success" });
  });
});
server.post("/api/activate-user/", (req, res) => {
  const token = req.body.token;
  const new_token = randoms(25);
  const sql = "SELECT `email` FROM `users` WHERE `activation_token` = ?";
  db.query(sql, [token], (err, suc) => {
    if (err) throw err;
    if (suc.length > 0) {
      const sql =
        "UPDATE `users` SET `activation_token` = ?, `activated` = 1 WHERE `activation_token` = ?";
      db.query(sql, [new_token, token], (err, succ) => {
        if (err) throw err;
        res.send({ condition: "success" });
      });
    } else {
      res.send({ condition: "userNotExist" });
    }
  });
});

server.post("/api/place-order/", (req, res) => {
  const {
    input1,
    input2,
    input3,
    input4,
    user,
    service_type,
    service_slug,
    service_categ,
    service_name,
  } = req.body.data;
  if (user === "") res.send({ condition: "UserNotExist" });
  if (service_name === "" || service_slug === "")
    res.send({ condition: "dataNotFilled" });
  const slug = randoms(60);
  // const sql =
  // "SELECT `email`,`crnt_balance`,`firstname`, `activated` FROM `users` WHERE slug = ?";
  const sql =
    "SELECT users.`email`,users.`crnt_balance`,users.`firstname`, users.`activated`,  user_rating.category, user_rating.discount FROM  users,user_rating WHERE users.slug = ? AND users.rating = user_rating.slug";
  db.query(sql, [user], (err, suc) => {
    console.log("userssss: ", suc);
    if (err) throw err;
    if (suc.length > 0) {
      if (suc[0].activated === 0) {
        res.send({ condition: "UsrNtActive" });
      } else {
        const sql = "SELECT `price` FROM `services_list` WHERE `srvc_slug` = ?";
        db.query(sql, [service_slug], (err, price) => {
          if (err) throw err;
          const email = suc[0].email;
          let balance = suc[0].crnt_balance;
          const discount = suc[0].discount;
          const firstname = suc[0].firstname;
          price = price[0].price;
          if (price > 0) {
            price = price - discount;
          }
          if (price > balance) {
            res.send({ condition: "BlncNotEnough" });
          } else {
            const sql =
              "INSERT INTO `orders` (`paid`,`user`, `service_type`, `category`, `service`, `service_name`, `input1`, `input2`, `input3`, `input4`, `slug`)VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?,?)";
            db.query(
              sql,
              [
                price,
                user,
                service_type,
                service_categ,
                service_slug,
                service_name,
                input1,
                input2,
                input3,
                input4,
                slug,
              ],
              (err, succ) => {
                if (err) throw err;
                const id = succ.insertId;
                if (err) throw err;
                else {
                  const sql =
                    "UPDATE users SET crnt_balance = crnt_balance - ?, total_spent=total_spent + ? WHERE slug = ?";
                  db.query(sql, [price, price, user], (err, lastAction) => {
                    if (err) throw err;
                    // const data = {
                    //   type: "order-placed",
                    //   order: {
                    //     email,
                    //     link,
                    //     firstname: firstname,
                    //     order_name: service_name,
                    //   },
                    // };
                    // SendEmail(data);
                    res.send({ condition: "success", link });
                  });
                  const link = ROOT + "/my-order/" + id;
                }
              }
            );
          }
        });
      }
    } else {
      res.send({ condition: "UserNotExist" });
    }
  });
});

server.get("/api/favo-list/:user", (req, res) => {
  const user = req.params.user;
  const sql =
    "SELECT favourites.item, services_list.service,services_list.srvc_slug FROM favourites, services_list WHERE favourites.user = ? AND `favourites`.`item` = `services_list`.`srvc_slug` ORDER BY `favourites`.`id` DESC LIMIT 15";
  db.query(sql, [user], (err, suc) => {
    if (err) throw err;
    res.send(suc);
  });
});
server.post("/api/palce-payment-request/", (req, res) => {
  const { slug, amount, crncy, email, phone, method } = req.body;
  if (
    amount === "" ||
    crncy === "" ||
    email === "" ||
    phone === "" ||
    slug === ""
  ) {
    res.send({ condition: "DataNotEnough" });
  } else {
    const amSlug = randoms(120);
    const token = _hashes_(amSlug);
    const sql =
      "INSERT INTO `payments`(`user`, `email`, `phone`, `amount`,`currency`,`method`, `token`, `slug`) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
      sql,
      [slug, email, phone, amount, crncy, method, token, amSlug],
      (err, suc) => {
        if (err) throw err;
        res.send({ condition: "success" });
      }
    );
  }
});
server.post("/api/user-verification/", (req, res) => {
  const { email, currency, slug } = req.body;
  const sql =
    "SELECT email, firstname, lastname, phone, currency,address1,slug FROM users WHERE email = ?  AND currency = ? AND slug = ?";
  db.query(sql, [email, currency, slug], (err, suc) => {
    if (err) throw err;
    res.send(suc);
  });
});
server.get("/api/user/:slug", (req, res) => {
  const slug = req.params.slug;
  const sql =
    "SELECT users.*, user_rating.stars,user_rating.stars, user_rating.category,user_rating.message, user_rating.discount FROM  users,user_rating WHERE users.slug = ? AND users.rating = user_rating.slug";
  db.query(sql, [slug], (err, suc) => {
    if (err) throw err;
    res.send(suc);
  });
});
server.get("/api/get-fav/:user", (req, res) => {
  const { user } = req.params;
  const sql = "SELECT * FROM favourites WHERE user = ?";
  db.query(sql, [user], (err, suc) => {
    if (err) throw err;
    res.send(suc);
  });
});
server.get("/api/handle-fav/:user/:action/:item/:table", (req, res) => {
  const { user, action, item, table } = req.params;
  console.log(user, action, item);
  let sql = "SELECT `user` FROM `favourites` WHERE `user` = ? AND `item` = ?";
  db.query(sql, [user, item], (err, suc) => {
    if (err) throw err;
    if (suc.length > 0) {
      sql = "DELETE FROM favourites WHERE `user` = ? AND `item` = ?";
      db.query(sql, [user, item], (err, succ) => {
        if (err) throw err;
        res.send("deleted");
      });
    } else {
      const slug = randoms(120);
      sql =
        "INSERT INTO favourites (user, item, item_table, slug) VALUES(?,?,?,?)";
      db.query(sql, [user, item, table, slug], (err, finale) => {
        if (err) throw err;
        res.send("success");
      });
    }
  });
});
server.post("/api/login", (req, res) => {
  const { email, password } = req.body.auth;
  const password_hash = _hashes_(password);
  const sql = "SELECT `email` FROM `users` WHERE `email` = ?";
  db.query(sql, [email], (err, suc) => {
    if (suc.length < 1) {
      res.send({ condition: "emailNotFound" });
    } else {
      const sql =
        "SELECT `email`, `firstname`, `lastname`,`activation_token`,`currency`, `slug` FROM `users` WHERE `email` = ? AND `password` = ?";
      db.query(sql, [email, password_hash], (err, succ) => {
        if (succ.length > 0) {
          const sql =
            "SELECT  `firstname`, `lastname`,`activation_token`,`currency`, `slug` FROM `users` WHERE `email` = ? AND `password` = ? AND activated = 1";
          db.query(sql, [email, password_hash], (err, final) => {
            if (err) throw err;
            if (final.length > 0) {
              res.send({ ...final, condition: "success" });
            } else {
              const user = succ[0];
              const activation_link =
                ROOT + "/activate-user/" + user.activation_toke;
              const data = {
                type: "register-account",
                register: {
                  email: user.email,
                  activation_link,
                  firstname: user.firstname,
                },
              };
              SendEmail(data);
              res.send({ condition: "NotActivated" });
            }
          });
        } else {
          res.send({ condition: "IncorrectPass" });
        }
      });
    }
  });
});
server.get("/api/category_list/:service_type", (req, res) => {
  const area = req.params.service_type;
  const sql =
    "SELECT category,slug FROM services_category WHERE service_type = ? AND active = 1";
  db.query(sql, [area], (err, succ) => {
    if (err) throw err;
    res.send(succ);
  });
});
server.get("/api/search/:query", (req, res) => {
  const query = req.params.query;
  const sql =
    "SELECT `services_list`.*  FROM `services_list` WHERE  `service` LIKE '%" +
    query +
    "%' OR srvc_slug LIKE '%" +
    query +
    "%' AND active = 1 LIMIT 15";
  db.query(sql, (err, succ) => {
    if (err) throw err;
    res.send(succ);
  });
});
server.get("/api/view-src/:slug", (req, res) => {
  const slug = req.params.slug;
  const sql =
    "SELECT services_list.*, services_category.category, services_category.service_type FROM services_list, services_category WHERE services_list.srvc_slug = ? AND services_list.category = services_category.slug ";
  db.query(sql, [slug], (err, succ) => {
    if (err) throw err;
    res.send(succ);
  });
});
server.post("/api/update-user/", (req, res) => {
  const {
    firstname,
    lastname,
    address1,
    address2,
    country,
    state,
    city,
    postal,
    slug,
    currency,
  } = req.body.formData;
  if (
    slug === "" ||
    firstname === "" ||
    lastname === "" ||
    address1 === "" ||
    currency === ""
  ) {
    res.send({ condition: "dataIsNotEnough" });
  } else {
    const sql =
      "UPDATE `users` SET `firstname` = ?, `lastname` = ?, `address1` = ?, `address2` = ?, `country` = ?, `state` = ?, `city` = ?,`currency`= ?, `postal` = ? WHERE `slug` = ?";
    db.query(
      sql,
      [
        firstname,
        lastname,
        address1,
        address2,
        country,
        state,
        city,
        currency,
        postal,
        slug,
      ],
      (err, suc) => {
        if (err) throw err;
        res.send({ condition: "updated" });
      }
    );
  }
});
server.post("/api/register-user/", (req, res) => {
  const {
    email,
    password,
    newsletter,
    firstname,
    lastname,
    add1,
    add2,
    country,
    state,
    city,
    zip,
    mobile,
    currency,
  } = req.body.formData;
  if (
    email === "" ||
    password === "" ||
    firstname === "" ||
    lastname === "" ||
    add1 === "" ||
    mobile === "" ||
    currency === ""
  ) {
    res.send({ condition: "InputNotFilled" });
    return 0;
  } else {
    const slug = randoms(60);
    const activation_token = randoms(19);
    const password_hash = _hashes_(password);
    db.query(
      "SELECT `email` FROM `users` WHERE `email` = ?",
      [email],
      (err, succ) => {
        if (err) throw err;
        if (succ.length > 0) {
          res.send({ condition: "emailExist" });
          return 0;
        } else {
          const sql =
            "INSERT INTO `users` (`email`, `password`, `firstname`, `lastname`, `address1`, `address2`, `country`, `state`, `city`, `postal`, `phone`,  `slug`, `activation_token`, `currency`) VALUES (?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
          db.query(
            sql,
            [
              email,
              password_hash,
              firstname,
              lastname,
              add1,
              add2,
              country,
              state,
              city,
              zip,
              mobile,
              slug,
              activation_token,
              currency,
            ],
            (err, suc) => {
              if (err) throw err;
              const activation_link =
                ROOT + "/activate-user/" + activation_token;
              const data = {
                type: "register-account",
                register: { email, activation_link, firstname },
              };
              SendEmail(data);
              res.send({ condition: "success" });
            }
          );
        }
      }
    );
  }
});

server.get("/api/grab-srvc/:slug", (req, res) => {
  const slug = req.params.slug;
  const sql =
    "SELECT services_list.*,services_category.service_type,services_category.category as categ_name FROM services_list, services_category WHERE services_list.category = services_category.slug AND services_list.srvc_slug = ?";
  db.query(sql, [slug], (err, srvc_data) => {
    if (err) throw err;
    res.send(srvc_data[0]);
  });
});
server.get("/api/super-junction", (req, res) => {
  const sql = "SELECT * FROM admins";
  db.query(sql, (err, suc) => {
    res.send(suc);
  });
});

server.get("/api/get-srvc/:type", (req, res) => {
  const srvc_type = req.params.type;
  let sql =
    "SELECT `services_list`.*, `services_category`.`category` FROM `services_list`, `services_category` WHERE services_category.service_type = ? and services_list.category = services_category.slug and services_list.active = 1 ORDER BY `services_list`.`id` DESC";
  if (srvc_type === "all") {
    sql =
      "SELECT `services_list`.*, `services_category`.`category` FROM `services_list`, `services_category` WHERE  services_list.category = services_category.slug and services_list.active = 1 ORDER BY `services_list`.`id` DESC";
  }
  db.query(sql, [srvc_type], (err, succ) => {
    if (err) throw err;
    res.send(succ);
  });
});
server.get("/", (req, res) => {
  console.log("Welcome to home screen");
  res.send("Welcome to home screen");
});

server.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
