import React, { useState, useEffect } from 'react';

const OverallAssembled = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('all');
  const [count, setCount] = useState(0);

  const rows = [
    { date: '2023-06-01', type: 'ATTO', count: 5 },
    { date: '2023-06-02', type: 'ATHENA', count: 3 },
    { date: '2023-06-03', type: 'ATTO', count: 2 },
    // Additional rows can be added here
  ];

  useEffect(() => {
    const filterRows = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let totalCount = 0;

      rows.forEach((row) => {
        const date = new Date(row.date);
        if ((!isNaN(start) && date < start) || (!isNaN(end) && date > end)) {
          return;
        }
        if (type !== 'all' && row.type !== type) {
          return;
        }
        totalCount += row.count;
      });

      setCount(totalCount);
    };

    filterRows();
  }, [startDate, endDate, type]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto my-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Overall Assembled</h1>
      
      <div className="text-center mb-6">
        <div className="inline-block p-4 rounded-lg bg-gray-100 mb-6">
          <span className="mr-4">New detectors</span>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2">ATTO</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">ATHENA</button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-1/2 p-4 border rounded-lg">
          <h3 className="text-xl font-bold text-red-500 mb-4">New Detector Assembled</h3>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{row.date}</td>
                  <td className="border border-gray-300 p-2">{row.type}</td>
                  <td className="border border-gray-300 p-2">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="w-1/2 p-4 border rounded-lg ml-4">
          <h3 className="text-xl font-bold text-red-500 mb-4">Date wise count Assembled</h3>
          <div className="mb-4">
            <label className="block mb-2">
              Start:
              <input type="date" className="ml-2 p-1 border rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label className="block mb-2">
              End:
              <input type="date" className="ml-2 p-1 border rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <label className="block mb-2">
              Type:
              <select className="ml-2 p-1 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">All</option>
                <option value="ATTO">ATTO</option>
                <option value="ATHENA">ATHENA</option>
              </select>
            </label>
          </div>
          <div className="flex justify-center items-center">
            <table className="w-24 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">{count}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg">DONE</button>
      </div>
    </div>
  );
};

export default OverallAssembled;