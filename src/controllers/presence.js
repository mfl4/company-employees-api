const PresenceModel = require("../models/presence");
const db = require("../config/database");

const GetAllPresences = async (req, res) => {
  const model = await PresenceModel.GetAllPresences();
  db.query(model.SQLquery, (err, result) => {
    if (err) console.log(err);
    res.send({
      message: "Get Success",
      data : result
    });
  });
};

const SearchPresence = async (req, res) => {
  const model = await PresenceModel.SearchPresence(req);
  db.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send({
      message : "success",
      data : result
    });
  });
};

const AddPresence = async (req, res) => {
  const model = await PresenceModel.Addpresence(req);
    db.query(model.SQLquery, (err, result) => {
      console.log(result);
      if (err) res.send(err);
      res.send({ 
        message: "add success",
        data : result 
      })
  })
  //     if (result.length === 0) {
  //       db.query(model.SQLquery, (err, result) => {
  //         if (err) res.send("error");
  //         res.send({ message: "add success" });
  //       });
  //     } else {
  //       res.send("error");
  //     }
  //   });
  // } catch (error) {
  //   res.send("Internal Server Error");
  // }
};

const UpdatePresence = async (req, res) => {
  const model = await PresenceModel.Updatepresence(req);
  db.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send({
      message: "Update Success",
      data: result,
    });
  });
};

const DeletePresence = async (req, res) => {
  const model = await PresenceModel.Deletepresence(req);
  db.query(model.SQLquery, (err, result) => {
    if (err) res.send(err);
    res.send({
      message: "Delete success",
      data: result,
    });
  });
};

module.exports = {
  GetAllPresences,
  SearchPresence,
  AddPresence,
  UpdatePresence,
  DeletePresence,
};
