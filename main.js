const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./utils/databaseConnection");
const responses = require("./utils/formatResponses");

// Body request parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// main route
app.get("/", (req, res) => {
  responses(200, "ini data", "ini pesan", res);
});

// KARYAWAN ROUTE
// CREATE karyawan
app.post("/karyawan", (req, res) => {
  const { namaKaryawan, tanggalLahir, jenisKelamin, alamat, noTelp, kodeDivisiFK, jabatan } = req.body;

  const query = `INSERT INTO karyawan ( nama_karyawan, tanggal_lahir, jenis_kelamin, alamat, no_telp, kode_divisiFK, jabatan) VALUES (${namaKaryawan}, ${tanggalLahir}, ${jenisKelamin}, ${alamat}, ${noTelp}, ${kodeDivisiFK}, ${jabatan} )`;
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
  const { id, namaKaryawan, tanggalLahir, jenisKelamin, alamat, noTelp, kodeDivisiFK, jabatan } = req.body;
  const query = `UPDATE karyawan SET nama_karyawan = ${namaKaryawan}, tanggal_lahir= ${tanggalLahir}, jenis_kelamin = ${jenisKelamin}, alamat = ${alamat}, no_telp = ${noTelp}, kode_divisiFK = ${kodeDivisiFK}, jabatan = ${jabatan} WHERE id_karyawan = ${id}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, "update", "Update employee data successfully", res);
  });
});

// DELETE karyawan
app.delete("/karyawan/:id", (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM karyawan WHERE id_karyawan = ${id}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, results, "Delete employee data successfully", res);
  });
});

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
app.put("/divisi/:id", (req, res) => {
  const { kodeDivisi, namaDivisi, deskripsi } = req.body;
  const query = `UPDATE karyawan SET nama_karyawan = ${namaKaryawan}, tanggal_lahir= ${tanggalLahir}, jenis_kelamin = ${jenisKelamin}, alamat = ${alamat}, no_telp = ${noTelp}, kode_divisiFK = ${kodeDivisiFK}, jabatan = ${jabatan} WHERE id_karyawan = ${id}`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    responses(200, "update", "Update employee data successfully", res);
  });
  responses(200, "update", "Update employee data successfully", res);
});

// DELETE divisi
app.delete("/divisi/:id", (req, res) => {
  responses(200, "delete", "Delete employee data successfully", res);
});

// PRESENSI ROUTE
// CREATE presensi
app.post("/presensi", (req, res) => {
  const { idKaryawanFK, keterangan } = req.body;

  const query = `INSERT INTO divisi ( id_karyawanFK, keterangan) VALUES (${idKaryawanFK}, ${keterangan} )`;
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
app.put("/presensi/:id", (req, res) => {
  responses(200, "update", "Update presence data successfully", res);
});

// DELETE presensi
app.delete("/presensi/:id", (req, res) => {
  responses(200, "delete", "Delete presence data successfully", res);
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
