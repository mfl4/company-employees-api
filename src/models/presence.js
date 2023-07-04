exports.GetAllPresence = () => {
  const SQLquery = "SELECT * FROM presence";
  return { SQLquery };
};

exports.Searchpresence = (req) => {
  const SQLquery = `SELECT * FROM presence WHERE name LIKE '%${req.query.find}%'`;
  return { SQLquery };
};

exports.Addpresence = (req) => {
  const { presence_id, name, birth_date, gender, address, phone_num, job_title, email, password, role, division_idFK } = req.query;
  const SQLquery = `INSERT INTO presence(presence_id, name, birth_date, gender, address, phone_num, job_title, email, password, role, division_idFK) VALUES (${presence_id}, ${name}, ${birth_date}, ${gender}, ${address}, ${phone_num}, ${job_title}, ${email}, ${password}, ${role}, ${division_idFK})`;
  const checker = `SELECT * FROM presence WHERE presence_id = ${presence_id} OR name = ${name}`;
  return { SQLquery, checker };
};

exports.Updatepresence = (req) => {
  const { presence_id, name, birth_date, gender, address, phone_num, job_title, email, password, role, division_idFK } = req.query;
  const SQLquery = `UPDATE presence SET name = '${name}', birth_date = '${birth_date}', gender = '${gender}', address = '${address}',phone_num = '${phone_num}', job_title = '${job_title}', email = '${email}', password = '${password}', role = '${role}', division_idFK '${division_idFK}' WHERE presence_id = '${presence_id}'`;
  return { SQLquery };
};

exports.Deletepresence = (req) => {
  const { presence_id } = req.query;
  const SQLquery = `DELETE FROM presence WHERE presence_id = ${presence_id}`;
  return { SQLquery };
};
