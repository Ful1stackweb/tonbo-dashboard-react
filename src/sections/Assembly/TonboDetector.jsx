import React from 'react';

const TonboDetector = () => {
  const handleSearch = () => {
    const serialNumber = document.getElementById('serial-number').value;
    alert('Searching for serial number: ' + serialNumber);
  };

  const handleViewDetails = (stage) => {
    alert('Viewing details for: ' + stage);
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
      <div className="flex justify-around mb-6">
        <div className="text-center">
          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto mb-2"></div>
          <span>Assembly</span>
        </div>
        <div className="text-center">
          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto mb-2"></div>
          <span>Chamber Calibration</span>
        </div>
        <div className="text-center">
          <div className="w-5 h-5 bg-red-500 rounded-full mx-auto mb-2"></div>
          <span>Post Calibration</span>
        </div>
        <div className="text-center">
          <div className="w-5 h-5 bg-gray-500 rounded-full mx-auto mb-2"></div>
          <span>Testing</span>
        </div>
        <div className="text-center">
          <div className="w-5 h-5 bg-gray-500 rounded-full mx-auto mb-2"></div>
          <span>Sent to Store</span>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Stage</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {[
            { stage: 'Assembly', date: '25/04/2024' },
            { stage: 'Chamber Calibration', date: '26/04/2024' },
            { stage: 'Post Calibration', date: '' },
            { stage: 'Testing', date: '' },
            { stage: 'Sent to Store', date: '' }
          ].map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{row.stage}</td>
              <td className="border border-gray-300 p-2">{row.date}</td>
              <td className="border border-gray-300 p-2">
                <button 
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => handleViewDetails(row.stage)}
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
