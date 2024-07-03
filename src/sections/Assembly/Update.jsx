import React, { useState } from 'react';

const Update = () => {
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [statusData, setStatusData] = useState([
    { slNo: 1, tiSlNo: 'TUV-7518451', status: 'NOT PRODUCED' },
    { slNo: 2, tiSlNo: 'TUV-7848489', status: 'NOT PRODUCED' },
    { slNo: 3, tiSlNo: 'TUV-9008312', status: 'NOT PRODUCED' },
    { slNo: 4, tiSlNo: 'TUV-9008888', status: 'NOT PRODUCED' },
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
      <h1 className="text-3xl font-bold text-center mb-6">ODOO Status Update</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="w-1/3 pr-4">
          <label htmlFor="date" className="block text-gray-600 font-semibold mb-2">Select Date</label>
          <div className="relative">
            <input
              type="date"
              id="date"
              name="date"
              className="block w-full p-2 border border-gray-300 rounded-md text-center text-sm"
              style={{ maxWidth: '150px' }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/3 mx-auto">
          <label htmlFor="search-sl-no" className="block text-gray-600 font-semibold mb-2">Search by SL.No</label>
          <div className="relative">
            <input
              type="text"
              id="search-sl-no"
              className="block w-full p-2 border border-gray-300 rounded-md text-center"
              placeholder="Enter SL.No"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <table className="w-full table-auto mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-center">SL.No</th>
            <th className="border border-gray-300 px-4 py-2 text-center">TI SL.No</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Procedure Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={row.slNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.slNo}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.tiSlNo}</td>
              <td className="border border-gray-300 px-4 py-2">
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
