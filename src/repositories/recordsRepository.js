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
  update: async function (id, body) {
    const patch = await records.update(
      {
        title: body.title,
        addressee: body.addressee,
        file: body.file,
      },
      {
        where: {
          id,
        },
      }
    );
    const updated = await records.findByPk(id, {
      attributes: { exclude: ["deletedAt"] },
    });

    return updated;
  },
  destroy: async function (id) {
    const deleted = await records.destroy({
      where: {
        id,
      },
    });
    return deleted;
  },
};
