import React, { useState } from 'react';

const DustSensor = () => {
  const [tableData, setTableData] = useState([
    { slNo: 1, tiSlNo: 'TUV-9001234', status: 'passed', rejection: '' },
    { slNo: 2, tiSlNo: 'TUV-9001235', status: 'failed', rejection: '' },
    { slNo: 3, tiSlNo: 'TUV-9001236', status: 'passed', rejection: '' },
    { slNo: 4, tiSlNo: 'TUV-9001237', status: 'failed', rejection: '' },
  ]);
  const [clearedDust, setClearedDust] = useState('');

  const handleStatusChange = (index, newStatus) => {
    const newTableData = tableData.map((row, i) => (i === index ? { ...row, status: newStatus } : row));
    setTableData(newTableData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Dust Sensor Module</h1>
      <div className="container mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4 text-right">
          <span className="text-sm font-semibold">Sensor Count: 4</span>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" id="date" name="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-1/2">
            <label htmlFor="search-sl-no" className="block text-sm font-medium text-gray-700">Search SL.No</label>
            <input type="text" id="search-sl-no" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2" />
            <span className="absolute right-3 top-9">
              <img src="/img/search.png" alt="Search" className="h-5 w-5" />
            </span>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200 mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL.No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TI SL.No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejection</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={row.slNo}>
                <td className="px-6 py-4 whitespace-nowrap">{row.slNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.tiSlNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2
                      ${row.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    <option value="passed">PASSED</option>
                    <option value="failed">FAILED</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2">
                    <option value=""></option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <label htmlFor="cleared-dust" className="block text-sm font-medium text-gray-700">Who cleared Dust</label>
            <select
              id="cleared-dust"
              value={clearedDust}
              onChange={(e) => setClearedDust(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2"
            >
              <option value=""></option>
              <option value="person1">Person 1</option>
              <option value="person2">Person 2</option>
              <option value="person3">Person 3</option>
            </select>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DustSensor;
