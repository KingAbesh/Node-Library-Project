const express = require("express");
const bookController = require("../controllers/bookController");
const bookRouter = express.Router();
const bookService = require("../services/goodreadsService")

const router = nav => {
  const { getIndex, getById, middleWare } = bookController(bookService, nav);
  bookRouter.use(middleWare);
  bookRouter.route("/").get(getIndex);

  bookRouter.route("/:id").get(getById);

  return bookRouter;
};

module.exports = router;

// key: nPApRsIaHZOcOjPtsa8x2A
// secret: ubTAIbpwv1oYQquCIcDePDgdhqxksbtss70g0da4wUo