import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, gender });
    navigate('/chat');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
        <div className={`p-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">CerdasBudi Chat</h2>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nama</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium mb-2">Usia</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="gender" className="block text-sm font-medium mb-2">Jenis Kelamin</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                required
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-full font-medium ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition duration-300`}
            >
              Mulai Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;