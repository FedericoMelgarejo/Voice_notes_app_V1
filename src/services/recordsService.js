const { getAll, create, update, destroy } = require("../repositories/recordsRepository");

module.exports = recordsService = {
  getRecords: async (req, res) => {
    //Fetch all the records in te database
    const records = await getAll();

    //Then try to send a response 200(OK) with the resuls
    try {
      if (records != undefined) {
        res.status(200).json({
          status: "OK",
          content: records,
        });
      } else {
        //If no results then send a 400 error
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no records to show.",
        });
      }
    } catch (errors) {
      //For other errors send a 500 internal server error and a console log with the issue
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
  createRecord: async function (req, res) {
    //Save the record properties
    const file = req.files[0].filename
    const body = req.body;
    console.log(file);
    //Call to the db for create the new record
    const record = await create(body, file);
    //Then try to send a 200 code response and the created record
    try {
      if (record) {
        res.status(201).json({
          status: "OK",
          message: "Record created!",
          record,
        });
      } else {
        //If error then send a 400 error code
        res.status(400).json({
          status: "error",
          message: "Error creating the record",
        });
      }
    } catch (errors) {
      //Internal server error response for other errors and a console log of the error
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
  updateRecord: async function (req, res) {
    //Id of record to update
    const { id } = req.params;
    //Properties to update
    const body = req.body;

    //Call to the db repository for update method
    const record = await update(id, body);

    //Then try to send a 201 response code with the updated record
    try {
      if (record) {
        res.status(201).json({
          status: "OK",
          message: "Record updated!",
          record,
        });
      } else {
        //if no results send a 400 error code
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no records with this id.",
        });
      }
    } catch {
      //Internal server error for other errors
      (errors) => {
        res.status(500).json({
          status: "error",
          message: "Internal error",
        }),
        //log with the errors
          console.log(errors);
      };
    }
  },
  deleteRecord: async function (req, res) {
    //Id of record to delete
    const { id } = req.params;
    //Call to the repository for the delete method
    const record = await destroy(id);
    //Then try to send a 200 response
    try {
      if (record) {
        res.status(200).json({
          status: "OK",
          message: "Record deleted!",
        });
      } else {
        //if no results, send a 400 error code
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no records with this id.",
        });
      }
    } catch (errors) {
      //Internal server error for other errors
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
      //Log with the errors
        console.log(errors);
    }
  },
};
