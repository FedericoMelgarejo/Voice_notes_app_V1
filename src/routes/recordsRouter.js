var express = require("express");
const { getRecordsListing, createNewRecord } = require("../controllers/recordsController");
var router = express.Router();

router.get("/", getRecordsListing);

router.post("/", createNewRecord);

module.exports = router;
