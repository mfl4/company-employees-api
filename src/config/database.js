const mysql = require("mysql");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company_employee",
});

module.exports = database;
