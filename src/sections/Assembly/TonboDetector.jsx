import React, { useState } from 'react';

const TonboDetector = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [status] = useState([
    { name: 'Assembly', completed: true, date: '28-06-2024' }, // Example date
    { name: 'Chamber Calibration', completed: true, date: '29-06-2024' },
    { name: 'Post Calibration', completed: false, date: '30-06-2024' },
    { name: 'Testing', completed: false, date: '' },
    { name: 'Sent to Store', completed: false, date: '' }
  ]);

  const handleSearch = () => {
    alert('Searching for serial number: ' + serialNumber);
  };

  const handleViewDetails = (stage) => {
    alert('Viewing details for: ' + stage);
    // Implement logic to display modal or popup with details
  };

  const handleDone = () => {
    alert('Done button clicked!');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mx-auto my-10 max-w-4xl text-center">
      <h1 className="text-3xl font-bold mb-6">Detector History</h1>
      <div className="mb-6 flex justify-center items-center space-x-4">
        <label htmlFor="serial-number" className="block text-gray-700">Detector S.I. No:</label>
        <input 
          type="text" 
          id="serial-number" 
          placeholder="Enter Serial Number" 
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="p-2 border rounded-md" 
        />
        <button 
          id="search-button" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        {status.map((stage, index) => {
          let circleColor = 'bg-gray-500'; // Default color is gray
          let icon = null;

          // Conditional logic based on stage.completed and stage.name
          if (stage.completed) {
            circleColor = 'bg-green-500'; // Green color if stage is completed
            icon = (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            );
          } else if (stage.name === 'Post Calibration') {
            circleColor = 'bg-red-500'; // Red color specifically for 'Chamber Calibration'
            icon = (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            );
          } else {
            // Handle other statuses here
            circleColor = 'bg-gray-500'; // Example default color for other statuses
            icon = (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            );
          }

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 ${circleColor} rounded-full flex items-center justify-center`}>
                  {icon}
                </div>
                <span className="font-bold">{stage.name}</span>
              </div>
              {index < status.length - 1 && (
                <div className="flex-grow h-1 bg-gray-300 mx-2"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
          <th className="border border-gray-300 p-2" style={{ color: '#0f52ba' }}>Stage</th>
          <th className="border border-gray-300 p-2" style={{ color: '#0f52ba' }}>Date</th>
          <th className="border border-gray-300 p-2" style={{ color: '#cf352e' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {status.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 font-bold">{row.name}</td>
              <td className="border border-gray-300 p-2">{row.date}</td>
              <td className="border border-gray-300 p-2">
                <button 
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => handleViewDetails(row.name)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={handleDone}
      >
        DONE
      </button>
    </div>
  );
};

export default TonboDetector;
