exports.GetAllEmployees = () => {
  const SQLquery = "SELECT * FROM employee";
  return SQLquery;
};

exports.SearchEmployee = (req) => {
  const SQLquery = `SELECT * FROM employee WHERE name LIKE '%${req.query.find}%'`;
  return SQLquery;
};
