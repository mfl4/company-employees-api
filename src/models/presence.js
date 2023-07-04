exports.GetAllPresences = () => {
  const SQLquery = "SELECT * FROM presence";
  return { SQLquery };
};

exports.Searchpresence = (req) => {
  const SQLquery = `SELECT * FROM presence WHERE name LIKE '%${req.query.find}%'`;
  return { SQLquery };
};

exports.Addpresence = (req) => {
  const { presence_id, description, presence_proof, employee_idFK} = req.query;
  const SQLquery = `INSERT INTO presence( description,presence_proof,employee_idFK) VALUES ('${description}', '${presence_proof}',${employee_idFK})`;
  const checker = `SELECT * FROM presence WHERE presence_id = ${presence_id}`;
  return { SQLquery, checker };
};

exports.Updatepresence = (req) => {
  const { presence_id, description, presence_proof, employee_idFK} = req.query;
  const SQLquery = `UPDATE presence SET description ='${description}', presence_proof='${presence_proof}',employee_idFK=${employee_idFK} WHERE presence_id = ${presence_id}`;
  return { SQLquery };
};

exports.Deletepresence = (req) => {
  const { presence_id } = req.query;
  const SQLquery = `DELETE FROM presence WHERE presence_id = ${presence_id}`;
  return { SQLquery };
};
