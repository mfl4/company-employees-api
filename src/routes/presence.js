// PRESENSI ROUTE
// CREATE presensi
app.post("/presensi", (req, res) => {
  const { idKaryawanFK, keterangan } = req.body;
  const query = `INSERT INTO presensi ( id_karyawanFK, keterangan) VALUES (${idKaryawanFK}, ${keterangan} )`;
  db.query(query, (err, results) => {
    if (err) {
      responses(500, "invalid", "error", res);
    }
    responses(200, results, "Insert division data successfully", res);
  });
});

// READ ALL presensi
app.get("/presensi", (req, res) => {
  const query = "SELECT * FROM presensi";
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Get all presence data successfully", res);
  });
});

// READ presensi
app.get("/presensi/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM presensi WHERE id_presensi = ${id} `;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Get presence data successfully", res);
  });
});

// UPDATE presensi
app.put("/presensi/", (req, res) => {
  const { idPresensi, idKaryawanFK, deskripsi } = req.body;
  const query = `UPDATE presensi SET id_karyawanFK = ${idKaryawanFK}, deskripsi = ${deskripsi} WHERE id_presensi = ${idPresensi}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, "update", "Update presence data successfully", res);
  });
});

// DELETE presensi
app.delete("/presensi/:id", (req, res) => {
  const { idPresensi } = req.body;
  const query = `DELETE  FROM presensi WHERE id_presensi = ${idPresensi}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, "delete", "Delete presence data successfully", res);
  });
});
