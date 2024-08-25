import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Myappointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const uuid = localStorage.getItem('uid');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/appointment/find/${uuid}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json(); // Correct way to parse JSON data
        setAppointments(data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Update state with error message
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [uuid]);

  const handleAppointmentClick = (appointmentId) => {
    navigate(`/myappointment/${appointmentId}`);
  };

  if (error) {
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  }

  if (appointments.length === 0) {
    return <div className="text-center text-gray-600 mt-10">No appointments found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Appointments</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold mb-2">{appointment.doctorName}</h2>
              <p className="text-gray-700 mb-4">{appointment.date}</p>
              <p className="text-gray-700 mb-4">{appointment.hospital}</p>
              <p className="text-gray-700 mb-4">{appointment.moreDetail}</p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => handleAppointmentClick(appointment._id)}
              >
                View Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myappointments;
