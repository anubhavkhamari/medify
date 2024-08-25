// src/components/AppointmentDetails.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const contentRef = useRef();
  const uuid = localStorage.getItem('uid');

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

  const handleMarkAsDone = async (id) => {

  }

  if (!appointment) return <div>Loading...</div>;
 const datas = [
  {first : "Hospital : ", second : appointment.hospital},
  {first : "Doctor's Contact : ", second : appointment.contact},
  {first : "Patient Name : ", second : appointment.patientName},
  {first : "Appointment Date : ", second : appointment.appointmentDate},
  {first : "Serial No : ", second : appointment.slot},
 ]
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 ">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg" ref={contentRef}>

        <h1 className="text-3xl font-bold mb-6 text-center"><u>Appointment Details</u></h1>
        <div className="mb-6">
          {/* <i className="fa fa-download fa-beat text-xl scale-100 transition duration-300 ease-in-out" aria-hidden="true" onClick={handlePrint} /> */}
          <h2 className="text-2xl font-bold">Doctor: Dr. {appointment.doctorName}</h2>
          {
              datas.map((d)=>{
                return (
                  <>
                  <p className="text-gray-700">{d.first}{d.second}</p>
                  </>
                )
              })
            }
          
          <p className="text-gray-700">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`http://localhost:3000/myappointment/${id}`}
              viewBox={`0 0 256 256`}
            />
          </p>
          <p className="text-gray-700" style={{display: "flex"}}>
          <button
              className="w-full mt-5 mr-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={()=>{handlePrint()}}
            >
              Download
            </button>
              
            {/* <button
              className="w-full mt-5 ml-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={() => handleMarkAsDone(appointment._id)}
            >
              DONE
            </button> */}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AppointmentDetails;
