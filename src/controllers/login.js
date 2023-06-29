const jwt = require("jsonwebtoken");
const LoginModel = require("../models/login");
const db = require("../config/database");

const EmployeeLogin = (req, res) => {
  const model = LoginModel.EmployeeLogin(req);
  db.query(model.SQLquery, [model.values], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // console.log(result);
      const email = result[0].email;
      const name = result[0].name;
      const id_employee = result[0].id_employee;
      const role = result[0].role;
      const token = jwt.sign({ email, role, name, id_employee }, "secret", { expiresIn: "1d" });
      res.cookie("token", token);
      return res.json({
        message: "success",
        role: role,
      });
    }
  });
};
const GetEmployees = async (req, res) => {
  const model = LoginModel.GetEmployees();
  db.query(model.SQLquery, (err, result) => {
    if (err) throw err;
    res.json({
      data: result,
    });
  });
};

module.exports = { EmployeeLogin, GetEmployees };
