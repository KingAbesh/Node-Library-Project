const express = require("express");
const bookRouter = express.Router();
const sql = require("mssql");
const debug = require("debug")("app:bookRoutes");

const router = nav => {
  const books = [
    {
      title: "War and Peace",
      genre: "Historical Fiction",
      author: "Lev Nikolayevich Tolstoy",
      read: false
    },
    {
      title: "Les Miserables",
      genre: "Historical Fiction",
      author: "Victor Hugo",
      read: false
    },
    {
      title: "The Time Machine",
      genre: "Science Fiction",
      author: "Jules Verne",
      read: false
    },
    {
      title: "The Wind in the Willows",
      genre: "Fantasy",
      author: "Kenneth Grahame",
      read: false
    }
  ];
  bookRouter.route("/").get((req, res) => {
    (async function query() {
      try {
        const request = new sql.Request();
        const { recordset } = await request.query("SELECT * from books");
        debug(recordset);
        res.render("bookListView", {
          nav,
          title: "Library",
          books: recordset
        });
      } catch (err) {
        console.log(err);
      }
    })();
  });

  bookRouter
    .route("/:id")
    .all((req, res, next) => {
      (async function query() {
        try {
          const { id } = req.params;
          const request = new sql.Request();
          const { recordset } = await request
            .input("id", sql.Int, id)
            .query("SELECT * from books WHERE id = @id");
          [req.book] = recordset;
          next();
        } catch (err) {
          console.log(err);
        }
      })();
    })
    .get((req, res) => {
      debug(req.book);
      res.render("bookView", {
        nav,
        title: "Library",
        books: req.book
      });
    });

  return bookRouter;
};

module.exports = router;