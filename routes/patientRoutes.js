const express = require('express');
const controller = require('../controllers/patientController');

const router = express.Router();
router.route('/').get(controller.findAll).post(controller.create);
router.route('/:id').get(controller.findById).patch(controller.update).delete(controller.remove);

module.exports = router;

// http://localhost:5000/api/patients add and get all api