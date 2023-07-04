import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  })
);
server.use(cookieParser());
server.listen(3001, () => {
  console.log("Server Running");
});

const connection = mysql.createConnection({
  host: "localhost",
  database: "perpustakaan",
  user: "root",
});

connection.connect();

server.post("/login", (req, res) => {
  const { email, password } = req.query;
  const query = "SELECT * FROM member WHERE email = ? AND password = ?";
  const values = [email, password];
  connection.query(query, values, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log(result);
      const email = result[0].email;
      const role = result[0].role;
      const nama = result[0].nama;
      const id_account = result[0].id_account;
      const token = jwt.sign({ email, role, nama, id_account }, "secret", { expiresIn: "1d" });
      res.cookie("token", token);
      return res.json({
        message: "success",
      });
    }
  });
});

server.post("/register", (req, res) => {
  const { name, id, email, password } = req.query;
  const query = `INSERT INTO member(id_account, email, nama, password) values (${id},'${email}', '${name}', '${password}')`;
  const checker = `SELECT * FROM member WHERE id_account = ${id} OR email = '${email}'`;
  try {
    connection.query(checker, (err, result) => {
      if (result.length === 0) {
        connection.query(query, (err, result) => {
          if (err) res.send("error");
          res.send({ message: "success" });
        });
      } else {
        res.send("error");
      }
    });
  } catch (error) {
    res.send("Internal Server Error");
  }
});

server.post("/addbook", (req, res) => {
  const { id_buku, judul, penulis, penerbit, tahun_terbit, sinopsis, cover } = req.query;
  const query = `INSERT INTO buku(id_buku, judul, penulis, penerbit, tahun_terbit, sinopsis, cover) values (${id_buku},'${judul}', '${penulis}', '${penerbit}', ${tahun_terbit}, '${sinopsis}','${cover}')`;
  const checker = `SELECT * FROM buku WHERE id_buku = ${id_buku}`;
  try {
    connection.query(checker, (err, result) => {
      if (result.length === 0) {
        connection.query(query, (err, result) => {
          if (err) res.send("error");
          res.send({ message: "success" });
        });
      } else {
        res.send("error");
      }
    });
  } catch (error) {
    res.send("Internal Server Error");
  }
});

server.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "success",
  });
});

server.get("/showbook", (req, res) => {
  const { sql } = req.query;
  const query = `SELECT * FROM buku ${sql}`;
  connection.query(query, (err, result) => {
    res.json(result);
  });
});

server.post("/updatebook", (req, res) => {
  const { id_buku, judul, penulis, penerbit, tahun_terbit, sinopsis, cover } = req.query;
  const query = `UPDATE buku SET id_buku = ${id_buku}, judul = '${judul}', penulis = '${penulis}', penerbit = '${penerbit}', tahun_terbit = ${tahun_terbit}, sinopsis = '${sinopsis}', cover = '${cover}' WHERE id_buku = ${id_buku}`;
  try {
    connection.query(query, (err, result) => {
      if (err) res.send("error");
      res.send({ message: "success" });
    });
  } catch (error) {
    res.send("Internal Server Error");
  }
});

server.post("/deletebook", (req, res) => {
  const { id_buku } = req.query;
  const query = `delete from buku where id_buku=${id_buku}`;
  connection.query(query, (err, result) => {
    if (err) res.send("error");
    res.send({ message: "success" });
  });
});

const userAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ login: false, message: "login first" });
  } else {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.json({ login: false, message: "error authentication" });
      } else {
        req.email = decoded.email;
        req.role = decoded.role;
        req.nama = decoded.nama;
        req.id_account = decoded.id_account;
        next();
      }
    });
  }
};

server.post("/auth", userAuth, (req, res) => {
  return res.json({
    login: true,
    email: req.email,
    role: req.role,
    id_account: req.id_account,
    nama: req.nama,
  });
});

server.get("/pageview", (req, res) => {
  const { id_buku } = req.query;
  const query = `SELECT * FROM buku WHERE id_buku like '${id_buku}%'`;
  connection.query(query, (err, result) => {
    if (err) res.send("error");
    res.send(result);
  });
});

server.get("/query", (req, res) => {
  const query = `SELECT * FROM buku WHERE judul like '%${req.query.find}%'`;
  connection.query(query, (err, result) => {
    res.json(result);
  });
});

server.get("/sql", (req, res) => {
  const { query } = req.query;
  const sql = query;
  try {
    connection.query(sql, (req, result) => {
      res.json(result);
    });
  } catch (error) {
    res.send("error");
  }
});

server.get("/category", (req, res) => {
  const { query } = req.query;
  const sql = `SELECT* FROM buku WHERE id_buku like "${query}%"`;
  try {
    connection.query(sql, (error, result) => {
      res.json(result);
    });
  } catch (error) {}
});

server.post("/peminjaman", (req, res) => {
  const { id_member, tanggal_pengembalian, id_buku } = req.query;
  const sql = `INSERT INTO peminjaman(tanggal_pengembalian, id_buku, id_member) VALUES ('${tanggal_pengembalian}', ${id_buku}, ${id_member})`;
  const checker = `SELECT COUNT(id_buku) FROM peminjaman WHERE id_member=${id_member}`;
  const validator = `select id_buku from buku where id_buku in (select id_buku from peminjaman);`;
  try {
    connection.query(checker, (error, result) => {
      const limit = parseInt(Object.values(result[0]));
      let role;
      jwt.verify(req.cookies.token, "secret", (err, decoded) => {
        role = decoded.role;
      });
      if (limit < 5) {
        connection.query(validator, (error, result) => {
          let book = [];
          for (let x = 0; x < result.length; x++) {
            book.push(result[x].id_buku);
          }
          if (book.includes(parseInt(id_buku)) || role == "admin") {
            res.send({ message: "borrowed" });
          } else {
            connection.query(sql, (err, result) => {
              res.json(result);
            });
          }
        });
      } else {
        res.send({ message: "limit" });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

server.get("/return", (req, res) => {
  const { table, target } = req.query;
  const sql = `SELECT * FROM buku WHERE id_buku IN (SELECT id_buku FROM ${table} WHERE id_member = "${target}")`;
  try {
    connection.query(sql, (error, result) => {
      res.json(result);
    });
  } catch (error) {}
});

server.post("/borrow", (req, res) => {
  const { id_buku } = req.query;
  const sql = `DELETE FROM peminjaman WHERE id_buku = ${id_buku}`;
  try {
    connection.query(sql, (err, result) => {
      res.send({ message: "success" });
    });
  } catch (error) {
    res.send(error);
  }
});

server.post("/history", (req, res) => {
  const { id_buku, id_member } = req.query;
  const sql = `INSERT INTO pengembalian(id_buku, id_member) VALUES (${id_buku}, ${id_member})`;
  try {
    connection.query(sql, (err, result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(err);
  }
});

server.get("/counter", (req, res) => {
  const { table, id_member } = req.query;
  const checker = `SELECT COUNT(id_buku) FROM ${table} WHERE id_member=${id_member}`;
  try {
    connection.query(checker, (err, result) => {
      try {
        const count = parseInt(Object.values(result[0]));
        res.send({ count: count });
      } catch (error) {
        res.send(error);
      }
    });
  } catch (error) {}
});
