exports.GetAllEmployees = () => {
  const SQLquery = "SELECT * FROM employee";
  console.log(SQLquery);
  return SQLquery;
};

exports.SearchEmployee = (req) => {
  const SQLquery = `SELECT * FROM employee WHERE name LIKE '%${req.query.find}%'`;
  return SQLquery;
};

exports.AddEmployee = (req) => {
  const { idEmployee, name, birthDate, gender, address, phoneNum, jobTitle, email, password, role, divisionIdFK } = req.query;
  const SQLquery = `INSERT INTO employee(name, birth_date, gender, address, phone_num, job_title, email, password, role, division_idFK) VALUES ('${name}','${birthDate}', '${gender}', '${address}', '${phoneNum}','${jobTitle}', '${email}', '${password}', '${role}', '${divisionIdFK}')`;
  const checker = `SELECT * FROM employee WHERE id_employee = '${idEmployee}' OR name = '${name}'`;
  return { SQLquery, checker };
};

// exports.UpdateEmployee = (req) => {
//   const { id_employee, name, price, image } = req.query;
//   const SQLquery = `UPDATE Employee SET name = '${name}', price = ${price}, image = '${image}' WHERE id_Employee = '${id_Employee}'`;
//   return { SQLquery };
// };

// exports.DeleteEmployee = (req) => {
//   const { id_employee } = req.query;
//   const SQLquery = `DELETE FROM employee WHERE id_employee = '${id_employee}'`;
//   return { SQLquery };
// };
