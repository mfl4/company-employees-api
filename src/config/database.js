const mysql = require("mysql");

const database = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "company_employees_test",
});

module.exports = database;
