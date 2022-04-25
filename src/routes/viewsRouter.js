var express = require("express");
const { getAll, destroy, findByPk, update } = require("../repositories/recordsRepository");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

/* GET records listing page. */
router.get("/list", async (req, res) => {
  const list = await getAll();
  try {
    res.render("recordList", {
      records: list,
    });
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

/* Update record view */
router.get("/update/:id", async (req, res) => {
  const { id } = req.params;

  const record = await findByPk(id);

  try {
    res.render("updateRecord", {
      record: record
    });

  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

/* PUT Update record */
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req

  await update(id, body);

  try {
    res.redirect("/list");
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

/* Delete record */
router.get("/delete/:id", async (req, res) => {
  const {
    id
  } = req.params;

  await destroy(id);

  try {
    res.redirect("/list");
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

module.exports = router;