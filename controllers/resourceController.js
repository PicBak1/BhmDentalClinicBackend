const createResourceController = (service, resourceName) => ({
  create: async (req, res, next) => {
    try {
      const record = await service.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      res.json(await service.findAll(req.query));
    } catch (error) {
      next(error);
    }
  },

  findById: async (req, res, next) => {
    try {
      const record = await service.findById(req.params.id);
      if (!record) return res.status(404).json({ message: `${resourceName} not found` });
      res.json(record);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const record = await service.update(req.params.id, req.body);
      if (!record) return res.status(404).json({ message: `${resourceName} not found` });
      res.json(record);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const removed = await service.remove(req.params.id);
      if (!removed) return res.status(404).json({ message: `${resourceName} not found` });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
});

module.exports = createResourceController;
