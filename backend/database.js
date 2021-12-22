const mysql = require("mysql");
const DATABASE_HOST = "localhost";
const DATABASE_USER = "root";
const DATABASE_PASS = "";
const DATABASE_NAME = "FAST_u";

const db = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
});

// connect
db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("DB connected");
});
module.exports = db;
