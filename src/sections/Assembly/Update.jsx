import React, { useState, useEffect } from 'react';

const Update = () => {
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [statusData, setStatusData] = useState([
    { slNo: 1, tiSlNo: 'TUV-9001234', status: 'PRODUCED' },
    { slNo: 2, tiSlNo: 'TUV-9001234', status: 'PRODUCED' },
    { slNo: 3, tiSlNo: 'TUV-9001234', status: 'PRODUCED' },
    { slNo: 4, tiSlNo: 'TUV-9001234', status: 'PRODUCED' },
    // Additional rows can be added here
  ]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (index, newStatus) => {
    setStatusData(prevData => {
      const newData = [...prevData];
      newData[index].status = newStatus;
      return newData;
    });
  };

  const filteredData = statusData.filter(row => 
    row.tiSlNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto my-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">ODDO Status Update</h1>

      <div className="flex justify-between mb-6">
        <div className="w-1/2 pr-4">
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            className="mt-1 p-2 block w-full border rounded-md" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        <div className="w-1/2 pl-4">
          <label htmlFor="search-sl-no" className="block text-gray-700">Search SL.No</label>
          <div className="relative mt-1">
            <input 
              type="text" 
              id="search-sl-no" 
              className="p-2 block w-full border rounded-md" 
              value={search} 
              onChange={handleSearch} 
            />
            <span className="absolute right-3 top-3">
              <img src="/img/search.png" alt="Search" className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">SL.No</th>
            <th className="border border-gray-300 p-2">TI SL.No</th>
            <th className="border border-gray-300 p-2">Procedure Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={row.slNo}>
              <td className="border border-gray-300 p-2">{row.slNo}</td>
              <td className="border border-gray-300 p-2">{row.tiSlNo}</td>
              <td className="border border-gray-300 p-2">
                <select 
                  className={`w-full p-2 rounded-md ${row.status === 'PRODUCED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} 
                  value={row.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="PRODUCED" className="bg-green-100 text-green-800">PRODUCED</option>
                  <option value="NOT PRODUCED" className="bg-red-100 text-red-800">NOT PRODUCED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">SAVE</button>
      </div>
    </div>
  );
};

export default Update;
