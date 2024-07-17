import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        try {
          const response = await fetch(`http://localhost:5001/api/doc/search/${query}`);
          const json_data = await response.json()
          setResults(json_data);
        } catch (error) {
          console.error('Error fetching search results', error);
        }
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [query]);

  const handleAppointmentClick = (doctor) => {
    navigate(`/appointment/${doctor._id}`, { state: { doctor } });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Search for Doctors</h1>
          {/* <LogoutButton /> */}
        </div>
        <input
          type="text"
          placeholder="Search by name, specialty, hospital..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="max-h-56 overflow-y-auto space-y-2">
          {results.map((result) => (
            <div key={result.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold">{result.name}</h2>
              <p className="text-gray-700">{result.specialty}</p>
              <p className="text-gray-700">{result.hospital}</p>
              <p className="text-gray-700">{result.contact}</p>
              <p className="text-gray-700">{result.details}</p>
              <button 
                onClick={() => handleAppointmentClick(result)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Take Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
