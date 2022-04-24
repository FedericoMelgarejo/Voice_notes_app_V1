const { getRecords, createRecord, updateRecord, deleteRecord } = require("../services/recordsService");


module.exports = recordsController = {
    getRecordsListing: async (req, res) => {
        await getRecords(req, res);
      },
    createNewRecord: async (req, res) => {
        await createRecord(req, res);
      },
    updateOneRecord: async (req, res) => {
        await updateRecord(req, res);
      },
    deleteOneRecord: async (req, res) => {
        await deleteRecord(req, res);
      },
}
