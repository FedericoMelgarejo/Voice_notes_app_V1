const { getAll, create } = require("../repositories/recordsRepository");

module.exports = recordsService = {
  getRecords: async (req, res) => {
    const records = await getAll();

    try {
      if (records != undefined) {
        res.status(200).json({
          status: "OK",
          content: records,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Sorry, there are no records to show.",
        });
      }
    } catch (errors) {
      res.status(500).json({
        status: "error",
        message: "Error getting the records",
      }),
        console.log(errors);
    }
  },
  createRecord: async function (req, res) {
    const body = req.body;
    
    const record = await create(body);

    try {
      if (record) {
        res.status(201).json({
          status: "OK",
          message: "Record created!",
          record,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Error creating the record",
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
