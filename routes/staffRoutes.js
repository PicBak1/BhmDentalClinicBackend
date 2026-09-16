const express = require('express');
const controller = require('../controllers/staffController');

const router = express.Router();
router.route('/').get(controller.findAll).post(controller.create);
router.route('/:id').get(controller.findById).patch(controller.update).delete(controller.remove);

module.exports = router;
