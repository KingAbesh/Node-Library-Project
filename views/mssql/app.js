const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const sql = require("mssql");

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: "********",
  password: "**********",
  server: "***********", // You can use 'localhost\\instance' to connect to named instance
  database: "*********",

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};
sql.connect(config).catch(err => debug(err));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.set("views", "./views/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Books" },
  { link: "/authors", title: "Authors" }
];

const bookRouter = require("./views/routes/bookRoutes")(nav);

app.use("/books", bookRouter);
app.get("/", (req, res) => {
  res.render("index", {
    nav,
    title: "Library"
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
