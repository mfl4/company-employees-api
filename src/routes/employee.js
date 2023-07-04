const express = require("express");
const EmployeeController = require("../controllers/employee");

const router = express.Router();

router.get("/", EmployeeController.GetAllEmployees);
router.get("/search", EmployeeController.SearchEmployee);
router.post("/add", EmployeeController.AddEmployee);
router.post("/update", EmployeeController.UpdateEmployee);
router.post("/delete", EmployeeController.DeleteEmployee);

module.exports = router;
