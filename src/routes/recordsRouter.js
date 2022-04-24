var express = require("express");
const { getRecordsListing, createNewRecord, updateOneRecord, deleteOneRecord, } = require("../controllers/recordsController");
var router = express.Router();

router.get("/", getRecordsListing);

router.post("/", createNewRecord);

router.put("/:id", updateOneRecord);

router.delete("/:id", deleteOneRecord);

module.exports = router;
