var express = require("express");
const multer = require("../middlewares/multerRecordUpload")
const { getRecordsListing, createNewRecord, updateOneRecord, deleteOneRecord, } = require("../controllers/recordsController");
var router = express.Router();

//Get records listing
router.get("/", getRecordsListing);

//Create a new record
router.post("/",multer.any(), createNewRecord);

//Update a existing record by id
router.put("/:id", updateOneRecord);

//Delete a record
router.delete("/:id", deleteOneRecord);

module.exports = router;
