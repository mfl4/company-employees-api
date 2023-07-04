const EmployeeModel = require("../models/employee");
const db = require("../config/database");

const GetAllEmployees = async (req, res) => {
  const model = await EmployeeModel.GetAllEmployees();
  db.query(model.SQLquery, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
};

const SearchEmployee = async (req, res) => {
  const model = await EmployeeModel.SearchEmployee(req);
  db.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
};

const AddEmployee = async (req, res) => {
  const model = await EmployeeModel.AddEmployee(req);
  try {
    db.query(model.checker, (err, result) => {
      console.log(result);
      if (result.length === 0) {
        db.query(model.SQLquery, (err, result) => {
          if (err) res.send("error");
          res.send({ message: "success" });
        });
      } else {
        res.send("error");
      }
    });
  } catch (error) {
    res.send("Internal Server Error");
  }
};

const UpdateEmployee = async (req, res) => {
  const model = await EmployeeModel.UpdateEmployee(req);
  db.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send({
      message: "Update Success",
      data: result,
    });
  });
};

const DeleteEmployee = async (req, res) => {
  const model = await EmployeeModel.DeleteEmployee(req);
  db.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send({
      message: "Delete success",
      data: result,
    });
  });
};

module.exports = {
  GetAllEmployees,
  SearchEmployee,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee,
};
