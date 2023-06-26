const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhosts",
  user: "root",
  password: "",
  database: "tes_karyawan_db",
});

module.exports = db;
