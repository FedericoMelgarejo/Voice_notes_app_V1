const { records } = require("../database/models");

module.exports = recordsRepository = {
  getAll: async () => {
    const list = await records.findAll({
      attributes: { exclude: ["deletedAt"] },
    });
    return list;
  },
  create: async (body) => {
    const record = await records.create({
      title: body.title,
      addressee: body.addressee,
      file: body.file,
    });
    const created = await records.findByPk(record.id, {
      attributes: { exclude: ["deletedAt"] },
    });
    return created;
  },
};
