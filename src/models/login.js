exports.EmployeeLogin = (req) => {
  const { email, password } = req.query;
  const SQLquery = `SELECT * FROM employee WHERE email = ? AND password = ?`;
  const values = [email, password];
  return { SQLquery, values };
};
exports.GetEmployees = () => {
  const SQLquery = "SELECT * FROM employee";
  return { SQLquery };
};
