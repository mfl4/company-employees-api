const { Router } = require("express");
const EmployeeController = require("../controllers/employee");

const router = Router();

router.get("/", EmployeeController.GetAllEmployees);
router.post("/add", EmployeeController.AddEmployee);

module.exports = router;
