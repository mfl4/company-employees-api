const EmployeeModel = require("../models/employees");
const database = require("../config/database");

const GetAllEmployees = async (req, res) => {
  const model = await EmployeeModel.GetAllEmployees(req);
  database.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
};

const SearchEmployee = async (req, res) => {
  const model = await EmployeeModel.SearchEmployee(req);
  database.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
};

module.exports = { GetAllEmployees, SearchEmployee };
