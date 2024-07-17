const mongoose = require("mongoose");

const appointmentschema = new mongoose.Schema({
    patientName: { type: String, require: true },
    doctorCode: { type: String, require: true },
    doctorName: { type: String, require: true },
    hospital: { type: String, require: true },
    contact: { type: String, require: true },
    appointmentDate: { type: Date, require: true },
    slot: { type: Number, require: true },
    appointmentStatus: { type: String, default: "pending" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

const Appointment = mongoose.model("Appointment", appointmentschema);
module.exports = Appointment;