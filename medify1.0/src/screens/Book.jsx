// src/components/Appointment.js
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { uid } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor } = location.state;

    const [appointmentData, setAppointmentData] = useState({
        doctorCode: doctor._id,
        doctorName: doctor.name,
        hospital: doctor.hospital,
        contact: doctor.contact,
        patientName: "",
        appointmentDate: '',
    });

    const handleChange = (e) => {
        setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/appointment/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(appointmentData),
                });
            // const { appointment } = response.data;
            const data = await response.json();
            const appointment = await data.appointment;
            toast.success('Appointment booked successfully!');
            navigate(`/myappointment/${appointment._id}`, { state: { appointment } });
        } catch (error) {
            toast.error('Error booking appointment');
            console.error(error.message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Book Appointment</h1>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">{doctor.name}</h2>
                    <p className="text-gray-700">{doctor.specialty}</p>
                    <p className="text-gray-700">{doctor.hospital}</p>
                    <p className="text-gray-700">{doctor.contact}</p>
                    <p className="text-gray-700">{doctor.details}</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-gray-700">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={appointmentData.patientName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={appointmentData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Appointment;