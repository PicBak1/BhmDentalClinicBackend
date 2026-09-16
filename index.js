const express = require("express")
const cors = require("cors")
require("dotenv").config()

const patientRoutes = require("./routes/patientRoutes")
const staffRoutes = require("./routes/staffRoutes")
const medicineRoutes = require("./routes/medicineRoutes")
const appointmentRoutes = require("./routes/appointmentRoutes")

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/patients", patientRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use((error, req, res, next) => {
	console.error(error);
	const status = error.status || (error.name === "SequelizeValidationError" ? 400 : 500);
	res.status(status).json({
		message: error.message || "Internal server error",
		...(error.errors ? { errors: error.errors.map((item) => item.message) } : {})
	});
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app running on port ${port}`));

module.exports = app;