// src/components/AppointmentDetails.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const contentRef = useRef();

  useEffect(() => {

    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/appointment/${id}`);
        const data = await response.json();
        setAppointment(data);
        const response2 = await fetch(`http://localhost:5001/api/doc/${appointment.doctorCode}`);
        const data2 = await response2.json();
        console.log(data2);
      } catch (error) {
        console.error('Error fetching appointment details', error);
      }
    };

    fetchAppointment()
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  if (!appointment) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 ">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg" ref={contentRef}>

        <h1 className="text-3xl font-bold mb-6 text-center">Appointment Details</h1>
        <div className="mb-6">
        <i className="fa fa-download fa-beat text-xl scale-100 transition duration-300 ease-in-out" aria-hidden="true" onClick={handlePrint} />
          <h2 className="text-2xl font-bold">Doctor: Dr. {appointment.doctorName}</h2>
          <p className="text-gray-700">Hospital: {appointment.hospital}</p>
          <p className="text-gray-700">Doctor's Contact: {appointment.contact}</p>

          <p className="text-gray-700">Patient Name: {appointment.patientName}</p>

          <p className="text-gray-700">Date: {appointment.appointmentDate}</p>

          <p className="text-gray-700">Serial No: <b>{appointment.slot}</b></p>
          <p className="text-gray-700">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
              viewBox={`0 0 256 256`}
            />
          </p>
          <p className="text-gray-700">
          
          </p>

        </div>

      </div>

    </div>
  );
};

export default AppointmentDetails;
