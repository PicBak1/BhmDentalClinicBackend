const { Op } = require('sequelize');

const createResourceService = (model, searchFields, filterFields) => ({
  create: (data) => model.create(data),

  findAll: async (query = {}) => {
    const where = {};
    const { search, page = 1, limit = 25 } = query;

    if (search) {
      where[Op.or] = searchFields.map((field) => ({ [field]: { [Op.iLike]: `%${search}%` } }));
    }

    filterFields.forEach((field) => {
      if (query[field] !== undefined && query[field] !== '') {
        where[field] = query[field];
      }
    });

    const pageNumber = Math.max(Number.parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(Number.parseInt(limit, 10) || 25, 1), 100);
    const result = await model.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize
    });

    return {
      data: result.rows,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: result.count,
        pages: Math.ceil(result.count / pageSize)
      }
    };
  },

  findById: (id) => model.findByPk(id),

  update: async (id, data) => {
    const record = await model.findByPk(id);
    if (!record) return null;
    await record.update(data);
    return record;
  },

  remove: async (id) => {
    const record = await model.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }
});

module.exports = createResourceService;
