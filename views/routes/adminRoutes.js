const express = require("express");
const { MongoClient } = require("mongodb");
const adminRouter = express.Router();
const debug = require("debug")("app:adminRoutes");

const books = [
  {
    title: "War and Peace",
    genre: "Historical Fiction",
    author: "Lev Nikolayevich Tolstoy",
    bookId: 656,
    read: false
  },
  {
    title: "Les Miserables",
    genre: "Historical Fiction",
    author: "Victor Hugo",
    bookId: 24200,
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
const router = nav => {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(
          url,
          { useUnifiedTopology: true },
          { useNewUrlParser: true }
        );
        debug("Connected correctly to server");

        const db = client.db(dbName);

        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  });
  return adminRouter;
};
module.exports = router;
