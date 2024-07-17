// src/components/DoctorSignup.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

const DoctorSignup = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [hospital, setHospital] = useState('');
  const [moreDetail, setMoreDetail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('http://localhost:5001/api/doc/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, specialty, age, experience, contactNumber, hospital, moreDetail, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to save doctor data');
      }

      toast.success('Doctor onboarded successfully');
      navigate("/scan")
      setName('');
      setSpecialty('');
      setAge('');
      setExperience('');
      setContactNumber('');
      setHospital('');
      setMoreDetail('');
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-40 pb-40 bg-gradient-to-r from-pink-400 to-pink-600" title='Our team verifies before allowing someone to have doctors account to maintain genuinity'>
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup Request</h1>
        <form onSubmit={handleSubmit} className="space-y-4" >
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Hospital</label>
            <input
              type="text"
              name="hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">More Detail</label>
            <textarea
              name="moreDetail"
              value={moreDetail}
              onChange={(e) => setMoreDetail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300">
            Send
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default DoctorSignup;
