const express = require("express");
const EmployeeController = require("../controllers/login");

const router = express.Router();

router.post("/", EmployeeController.EmployeeLogin);
router.get("/", EmployeeController.GetEmployees);

module.exports = router;
