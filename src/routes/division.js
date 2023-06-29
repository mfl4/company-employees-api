// DIVISI ROUTE
// CREATE divisi
app.post("/divisi", (req, res) => {
  const { kodeDivisi, namaDivisi, deskripsi } = req.body;

  const query = `INSERT INTO divisi ( kode_divisi, nama_divisi, deskripsi) VALUES (${kodeDivisi}, ${namaDivisi}, ${deskripsi} )`;
  db.query(query, (err, results) => {
    if (err) {
      responses(500, "invalid", "error", res);
    }
    responses(200, results, "Insert division data successfully", res);
  });
});

// READ ALL divisi
app.get("/divisi", (req, res) => {
  const query = "SELECT * FROM divisi";
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Get all divisions data successfully", res);
  });
});

// READ divisi
app.get("/divisi/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM divisi WHERE kode_divisi = ${id} `;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Get division data successfully", res);
  });
});

// UPDATE divisi
app.put("/divisi/", (req, res) => {
  const { kodeDivisi, namaDivisi, deskripsi } = req.body;
  const query = `UPDATE divisi SET nama_divisi = ${namaDivisi}, deskripsi = ${deskripsi} WHERE kode_divisi = ${kodeDivisi}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, "update", "Update division data successfully", res);
  });
});

// DELETE divisi
app.delete("/divisi", (req, res) => {
  const { kodeDivisi } = req.body;
  const query = `DELETE FROM divisi WHERE kode_divisi = ${kodeDivisi}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
    }
    responses(200, results, "Delete division data successfully", res);
  });
});
