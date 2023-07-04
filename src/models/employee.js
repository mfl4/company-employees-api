exports.GetAllEmployees = () => {
  const SQLquery = "SELECT * FROM employee";
  return { SQLquery };
};

exports.SearchEmployee = (req) => {
  const SQLquery = `SELECT * FROM employee WHERE name LIKE '%${req.query.find}%'`;
  return { SQLquery };
};

exports.AddEmployee = (req) => {
  const {  employee_id, name, email, password, role, division_idFK } = req.query;
  const SQLquery = `INSERT INTO employee( name, email, password, role, division_idFK) VALUES ('${name}','${email}', '${password}', '${role}', ${division_idFK})`;
  const checker = `SELECT * FROM employee WHERE employee_id = ${employee_id} OR name = ${name}`;
  return { SQLquery, checker };
};

exports.UpdateEmployee = (req) => {
  const { employee_id, name, email, password, role, division_idFK } = req.query;
  const SQLquery = `UPDATE employee SET name = '${name}', email = '${email}', password = '${password}', role = '${role}', division_idFK = ${division_idFK} WHERE employee_id = ${employee_id}`;
  return { SQLquery };
};

exports.DeleteEmployee = (req) => {
  const { employee_id } = req.query;
  const SQLquery = `DELETE FROM employee WHERE employee_id = ${employee_id}`;
  return { SQLquery };
};
