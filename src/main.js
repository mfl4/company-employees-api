const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const port = 3000;
const LoginRouter = require("./routes/login");
// const EmployeeRouter = require("./routes/employee");
// const DivisionRouter = require("./routes/division");
// const PresenceRouter = require("./routes/presence");

const app = express();

app.use(
  cors({
    credentials: true,
    methods: ["GET, POST, PUT, DELETE"],
    origin: "http://localhost:5174",
  })
);

app.use(express.json());
app.use(cookieParser());
// app.use('/auth', userAuth);
app.use("/login", LoginRouter);
// app.use("/employee", EmployeeRouter);
// app.use("/division", DivisionRouter);
// app.use("/presence ", PresenceRouter);

// main route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Main Route is OK!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});
