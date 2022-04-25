var express = require("express");
const multer = require("../middlewares/multerRecordUpload")
const { getRecordsListing, createNewRecord, updateOneRecord, deleteOneRecord, } = require("../controllers/recordsController");
var router = express.Router();
//Projects schema
/**
 * @swagger
 * components:
 *  schemas:
 *      Record:
 *          type: object
 *          properties:
 *             title:
 *                type: string
 *                description: Record title
 *             addressee:
 *                type: string
 *                description: Record addressee
 *             file:
 *                type: string
 *                description: Record file
 *          example:
 *              title: EXAMPLE TITLE
 *              addressee: EXAMPLE ADDRESSEE
 *              file: exampleFileName.ogg
 */

    //Get records listing
/**
 * @swagger
 * /api/v1/records:
 *  get:
 *      summary: Get all records
 *      tags: [Record]
 *      responses:
 *          200:
 *           description: A list of all records
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Record'
 */

    //Create new record
/**
 * @swagger
 * /api/v1/records:
 *  post:
 *    summary: Create a record
 *    tags: [Record]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Record'
 *    responses:
 *        201:
 *         description: new record created!
 */

    //Update record by ID
/**
 * @swagger
 * /api/v1/records/{id}:
 *  put:
 *      summary: Update record title by id
 *      tags: [Record]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the record id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                             type: string
 *                             description: Record title
 *                      example:
 *                          title: EXAMPLE TITLE
 *                              
 *      responses:
 *          201:
 *           description: record updated!
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Record'
 *          400:
 *           description: bad request, record not found
 */

    //Delete record by ID
/**
 * @swagger
 * /api/v1/records/{id}:
 *  delete:
 *      summary: Delete record by id
 *      tags: [Record]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: the record id
 *      responses:
 *          200:
 *           description: record deleted!
 *           content:
 *              aplication/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Record'
 *          400:
 *           description: bad request, record not found
 */


//Get records listing
router.get("/", getRecordsListing);

//Create a new record
router.post("/", multer.any(), createNewRecord);

//Update a existing record by id
router.put("/:id", updateOneRecord);

//Delete a record
router.delete("/:id", deleteOneRecord);

module.exports = router;
