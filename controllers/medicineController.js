const createResourceController = require('./resourceController');
const medicineService = require('../services/medicineService');
const { Medicine, MedicationLog, sequelize } = require('../models');

const controller = createResourceController(medicineService, 'Medicine');

controller.restock = async (req, res, next) => {
	try {
		const quantity = Number(req.body.quantity);
		if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: 'Quantity must be a positive whole number.' });
		const medicine = await Medicine.findByPk(req.params.id);
		if (!medicine) return res.status(404).json({ message: 'Medicine not found.' });
		await medicine.update({ stockLevel: medicine.stockLevel + quantity, status: 'active' });
		res.json(medicine);
	} catch (error) { next(error); }
};

controller.dispense = async (req, res, next) => {
	const transaction = await sequelize.transaction();
	try {
		const quantity = Number(req.body.quantity);
		if (!Number.isInteger(quantity) || quantity < 1) {
			await transaction.rollback();
			return res.status(400).json({ message: 'Quantity must be a positive whole number.' });
		}
		const medicine = await Medicine.findByPk(req.params.id, { transaction, lock: transaction.LOCK.UPDATE });
		if (!medicine) { await transaction.rollback(); return res.status(404).json({ message: 'Medicine not found.' }); }
		if (medicine.stockLevel < quantity) {
			await transaction.rollback();
			return res.status(400).json({ message: `Only ${medicine.stockLevel} ${medicine.unit} available.` });
		}
		await medicine.update({ stockLevel: medicine.stockLevel - quantity, status: medicine.stockLevel - quantity === 0 ? 'out of stock' : 'active' }, { transaction });
		const log = await MedicationLog.create({ medicineId: medicine.id, patient: req.body.patient, dosage: req.body.dosage, route: req.body.route, quantity, recordedAt: req.body.recordedAt, clinician: req.body.clinician, notes: req.body.notes }, { transaction });
		await transaction.commit();
		res.status(201).json({ medicine, log });
	} catch (error) { await transaction.rollback(); next(error); }
};

module.exports = controller;
