const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./utils/databaseConnection");
const responses = require("./utils/formatResponses");

// Body request parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// main route
app.get("/", (req, res) => {
  responses(200, "ini data", "ini pesan", res);
});

// KARYAWAN ROUTE
// CREATE karyawan
app.post("/karyawan", (req, res) => {
  const { namaKaryawan, tanggalLahir, jenisKelamin, alamat, noTelp, kodeDivisi, jabatan } = req.body;

  const query = `INSERT INTO mahasiswa ( nama_karyawan, tanggal_lahir, jenis_kelamin, alamat, no_telp, kode_divisiFK, jabatan) VALUES (${namaKaryawan}, ${tanggalLahir}, ${jenisKelamin}, ${alamat}, ${noTelp}, ${kodeDivisi}, ${jabatan} )`;
  db.query(query, (err, results) => {
    if (err) {
      responses(500, "invalid", "error", res);
    }
    responses(200, results, "Insert employees data successfully", res);
  });
});

// READ ALL karyawan
app.get("/karyawan", (req, res) => {
  const query = "SELECT * FROM karyawan";
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Get all employees data successfully", res);
  });
});

// READ karyawan
app.get("/karyawan/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM karyawan WHERE id_karyawan = ${id} `;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Get employee data successfully", res);
  });
});

// UPDATE karyawan
app.put("/karyawan/:id", (req, res) => {
  const id = req.params.id;
  const { namaKaryawan, tanggalLahir, jenisKelamin, alamat, noTelp, kodeDivisi, jabatan } = req.body;
  const query = `UPDATE nama_karyawan = , tanggal_lahir, jenis_kelamin, alamat, no_telp, kode_divisiFK, jabatan WHERE id_karyawan = ${id}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }

    responses(200, "update", "Update employee data successfully", res);
  });
});

// DELETE karyawan
app.delete("/karyawan/:id", (req, res) => {
  responses(200, "delete", "Delete employee data successfully", res);
});

// DIVISI ROUTE
// CREATE divisi
app.post("/divisi", (req, res) => {
  res.send("POST /divisi");
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
  res.send("GET /divisi/:id");
});

// UPDATE divisi
app.put("/divisi/:id", (req, res) => {
  res.send("PUT /divisi/:id");
});

// DELETE divisi
app.delete("/divisi/:id", (req, res) => {
  res.send("DELETE /divisi/:id");
});

// PRESENSI ROUTE
// CREATE presensi
app.post("/presensi", (req, res) => {
  res.send("POST /presensi");
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
  res.send("GET /presensi/:id");
});

// UPDATE presensi
app.put("/presensi/:id", (req, res) => {
  res.send("PUT /presensi/:id");
});

// DELETE presensi
app.delete("/presensi/:id", (req, res) => {
  res.send("DELETE /presensi/:id");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
