const { getRecords, createRecord } = require("../services/recordsService");


module.exports = recordsController = {
    getRecordsListing: async (req, res) => {
        await getRecords(req, res);
      },
    createNewRecord: async (req, res) => {
        await createRecord(req, res);
      },
}
