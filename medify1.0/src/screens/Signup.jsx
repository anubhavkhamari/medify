import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaUser } from 'react-icons/fa';

const SignupChoice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r to-blue-400 via-purple-500 from-red-400">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Signup as</h1>
        <p className="mb-8 text-gray-600">Choose your role to continue</p>
        <div className="space-y-6">
          <Link
            to="/signupdoctor"
            className="flex items-center justify-center w-full py-3 px-6 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transform transition duration-300"
          >
            <FaUserMd className="mr-3" /> Doctor
          </Link>
          <Link
            to="/signupuser"
            className="flex items-center justify-center w-full py-3 px-6 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transform transition duration-300"
          >
            <FaUser className="mr-3" /> User
          </Link>
        </div>
        <p className="mb-8 mt-8 text-gray-600">Already Have An Account? <a href="/login" className='text-blue-600 hover:text-blue-800'>Click Here</a></p>
      </div>
    </div>
  );
};

export default SignupChoice;
