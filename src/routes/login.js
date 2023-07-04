const express = require("express");
const EmployeeController = require("../controllers/login");

const router = express.Router();

router.get("/get", EmployeeController.GetEmployees);
router.post("/", EmployeeController.EmployeeLogin);

module.exports = router;
