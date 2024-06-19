import React, { useState } from 'react';

const DateWiseAssembled = () => {
  const [sensorType, setSensorType] = useState('atto');
  const [rows, setRows] = useState([
    { date: '20/04/2024', type: 'Atto - panhead', count: 70 },
    { date: '20/04/2024', type: 'Atto - panhead', count: 70 },
    // Additional rows can be added here
  ]);

  const saveData = () => {
    alert('Data saved successfully!');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto my-10 max-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-6">Assembled Detectors</h2>
      
      <div className="text-center mb-6">
        <label className="mx-4">
          <input type="radio" name="sensor-type" value="atto" checked={sensorType === 'atto'} onChange={(e) => setSensorType(e.target.value)} />
          <span className="ml-2">Atto Sensor</span>
        </label>
        <label className="mx-4">
          <input type="radio" name="sensor-type" value="athena" checked={sensorType === 'athena'} onChange={(e) => setSensorType(e.target.value)} />
          <span className="ml-2">Athena Sensor</span>
        </label>
        <label className="mx-4">
          <input type="radio" name="sensor-type" value="old" checked={sensorType === 'old'} onChange={(e) => setSensorType(e.target.value)} />
          <span className="ml-2">Old Sensor details</span>
        </label>
      </div>

      <div className="mb-6">
        {rows.map((row, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg shadow">
            <span className="flex-1 text-center font-semibold">{row.date}</span>
            <span className="flex-1 text-center font-semibold">{row.type}</span>
            <span className="flex-1 text-center font-semibold">Assembled Count - {row.count}</span>
            <a href="#" className="text-blue-600 hover:underline font-semibold">VIEW</a>
          </div>
        ))}
      </div>

      <div className="mb-6 text-center">
        <table className="border-collapse border border-gray-300 mx-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Ti Detector SI. No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">TUV-9004578</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button onClick={saveData} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">DONE</button>
      </div>
    </div>
  );
};

export default DateWiseAssembled;
