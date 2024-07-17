const express = require("express");
const Appointment = require('../models/appointmentModel')
const { ObjectId } = require('mongodb');
const nodeMailer = require('nodemailer');

const apntRouter = express.Router();

apntRouter.get("/", (req, res) => {
    Appointment.find().then((appointments) => {
        res.json(appointments);
    })
})


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anubhavkhamari002@gmail.com',
        pass: 'qespe1-xugvof-voJtej'
    }
})

apntRouter.post("/", async (req, res) => {
    try {
        const { doctorCode, date } = req.body;

        // Count existing appointments for the doctor on the same date
        const count = await Appointment.countDocuments({ doctorCode, date });

        // Create a new appointment with the serial number
        const newAppointment = new Appointment({ ...req.body, slot: count + 1 });
        const savedAppointment = await newAppointment.save();

        res.status(201).json({ serialNo: savedAppointment.serialNo, appointment: savedAppointment });


        if (savedAppointment) {
            const mailConfigurations = {

                // It should be a string of sender email
                from: 'anubhavkhamari002@gmail.com',

                // Comma Separated list of mails
                to: 'anubhavkhamarivssut@gmail.com',

                // Subject of Email
                subject: 'Sending Email using Node.js',

                // This would be the text of email body
                text: 'Hi! There, You know I am using the'
                    + ' NodeJS Code along with NodeMailer '
                    + 'to send this email.'
            };

            transporter.sendMail(mailConfigurations, function (error, info) {
                if (error) throw Error(error);
                console.log('Email Sent Successfully');
                console.log(info);
            });

        }
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error });
    }
})

apntRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    Appointment.findById(id).then((apnt) => {
        if (apnt) {
            res.json(apnt);
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    })
})

apntRouter.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Appointment.findByIdAndRemove(id).then((apnt) => {
        if (apnt) {
            res.json({ message: "Appointment deleted successfully" });
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    })
})

apntRouter.post("/update/:id", (req, res) => {
    const id = req.params.id;
    Appointment.findByIdAndUpdate(id, { appointmentStatus: "done" }, { new: true }).then((apnt) => {
        if (apnt) {
            res.json(apnt);
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    })

})

module.exports = apntRouter;