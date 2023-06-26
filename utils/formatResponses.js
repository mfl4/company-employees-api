const responses = (sts, data, msg, res) => {
  res.json(sts, [
    {
      payload: data,
      msg,
    },
  ]);
};
module.exports = responses;
