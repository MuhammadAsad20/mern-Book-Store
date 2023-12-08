const app = require("express");
const router = app.Router();
const bookModel = require("../models/bookModel");

router.get("/", async (req, res) => {
    const books = await bookModel.find();
    res.status(200).send({
        count: books.length,
      status: 200,
      books,
    });
  });

  router.get("/:id", async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      res.status(500).send({ status: 500, error: true, msg: "book not found" });
    }
    if (book) {
      res.status(200).send({ status: 200, book });
    }
  });

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const book = await bookModel.create({ ...req.body });
    res.status(200).send({ status: 200, book });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, error: err, msg: "internal sever error" });
  }
  // users.push({ name: req.body.name, id: users.length + 1 })
});

router.delete("/:id", async (req, res) => {
    try {
      await bookModel.findByIdAndDelete(req.params.id);
      res.status(200).send({ status: 200, msg: "User deleted" });
    } catch (err) {
      res
        .status(500)
        .send({ status: 500, error: err, msg: "internal sever error" });
    }
    // users.splice(req.params.id - 1, 1)
    // res.status(200).send({ status: 200, users })
  });

router.put("/:id", async (req, res) => {
    try {
      const book = await bookModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      if (!book) {
        res.status(401).send({ status: 401, msg: "book Not Found" });
      } else {
        res.status(200).send({ status: 200, book, msg: "book Updated" });
      }
    } catch (err) {
      res
        .status(500)
        .send({ status: 500, error: err, msg: "internal sever error" });
    }
  });
  

module.exports = router; 