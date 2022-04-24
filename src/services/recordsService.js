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
    const body = req.body;
    //Call to the db for create the new record
    const record = await create(body);
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
    const { id } = req.params;
    const body = req.body;

    const record = await update(id, body);

    try {
      if (record) {
        res.status(201).json({
          status: "OK",
          message: "Record updated!",
          record,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no records with this id.",
        });
      }
    } catch {
      (errors) => {
        res.status(500).json({
          status: "error",
          message: "Internal error",
        }),
          console.log(errors);
      };
    }
  },
  deleteRecord: async function (req, res) {
    const { id } = req.params;

    const record = await destroy(id);

    try {
      if (record) {
        res.status(200).json({
          status: "OK",
          message: "Record deleted!",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no records with this id.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Internal error",
      }),
        console.log(errors);
    }
  },
};
