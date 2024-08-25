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
      user: '{mail}@gmail.com',
      pass: '***', // Use app password if 2FA is enabled
    },
  });

apntRouter.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const { doctorCode, date } = req.body;

        // Count existing appointments for the doctor on the same date
        const count = await Appointment.countDocuments({ doctorCode, date });

        // Create a new appointment with the serial number
        const newAppointment = new Appointment({ ...req.body, slot: count + 1 });
        const savedAppointment = await newAppointment.save();

        res.status(201).json({ serialNo: savedAppointment.serialNo, appointment: savedAppointment });

        const sendAppointmentEmail = async (patientEmail) => {
            const mailOptions = {
              from: 'mail@gmail.com',
              to: patientEmail,
              subject: 'Your Appointment Details',
              html: `
                <h1>Your Appointment Details</h1>
                <p>
                <p><strong>Doctor:</strong> Dr. ${savedAppointment.doctorName}</p>
                <p><strong>Date:</strong> ${savedAppointment.appointmentDate}</p>
                <p><strong>Hospital:</strong> ${savedAppointment.hospital}</p>
                <p><strong>Patient Name:</strong> ${savedAppointment.patientName}</p>
                <p>Thank you,<br>Medify</p>
                <p>
              `,
            };
          
            try {
              await transporter.sendMail(mailOptions);
              console.log('Email sent successfully');
            } catch (error) {
              console.error('Error sending email:', error);
            }
          };

        if (savedAppointment) {
            sendAppointmentEmail(req.body.email);   
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

apntRouter.get("/find/:owner", (req, res) => {
    const owner = req.params.owner;
    //find all appointments for same owner
    Appointment.find({ owner: owner }).then((apnt) => {
        if (apnt) {
            res.json(apnt);
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    })
})

module.exports = apntRouter;