import express, { application } from "express";
const app = express();
const port = 3000;

// main route
app.get("/", (req, res) => {
  res.send("Hello MFL4!");
});

// KARYAWAN MANAGEMENT
// CREATE karyawan
app.post("/karyawan", (req, res) => {
  res.send("POST /karyawan");
});

// READ ALL karyawan
app.get("/karyawan", (req, res) => {
  res.send("GET /karyawan");
});

// READ karyawan
app.get("/karyawan/:id", (req, res) => {
  res.send("GET /karyawan/:id");
});

// UPDATE karyawan
app.put("/karyawan/:id", (req, res) => {
  res.send("PUT /karyawan/:id");
});

// DELETE karyawan
app.delete("/karyawan/:id", (req, res) => {
  res.send("DELETE /karyawan/:id");
});

// DIVISI MANAGEMENT
// CREATE divisi
app.post("/divisi", (req, res) => {
  res.send("POST /divisi");
});

// READ ALL divisi
app.get("/divisi", (req, res) => {
  res.send("GET /divisi");
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

// PRESENSI MANAGEMENT
// CREATE presensi
app.post("/presensi", (req, res) => {
  res.send("POST /presensi");
});

// READ ALL presensi
app.get("/presensi", (req, res) => {
  res.send("GET /presensi");
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

// ABSENSI MANAGEMENT
// CREATE absensi
app.post("/absensi", (req, res) => {
  res.send("POST /absensi");
});

// READ ALL absensi
app.get("/absensi", (req, res) => {
  res.send("GET /absensi");
});

// READ absensi
app.get("/absensi/:id", (req, res) => {
  res.send("GET /absensi/:id");
});

// UPDATE absensi
app.put("/absensi/:id", (req, res) => {
  res.send("PUT /absensi/:id");
});

// DELETE absensi
app.delete("/absensi/:id", (req, res) => {
  res.send("DELETE /absensi/:id");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
