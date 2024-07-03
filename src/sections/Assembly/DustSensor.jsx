import React, { useState } from 'react';

const DustSensor = () => {
  const [tableData, setTableData] = useState([
    { slNo: 1, tiSlNo: 'TUV-9001234', status: 'failed', rejection: '' },
    { slNo: 2, tiSlNo: 'TUV-9001235', status: 'failed', rejection: '' },
    { slNo: 3, tiSlNo: 'TUV-9001236', status: 'failed', rejection: '' },
    { slNo: 4, tiSlNo: 'TUV-9001237', status: 'failed', rejection: '' },
  ]);
  const [clearedDust, setClearedDust] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (index, newStatus) => {
    const newTableData = tableData.map((row, i) => (i === index ? { ...row, status: newStatus } : row));
    setTableData(newTableData);
  };

  const filteredData = tableData.filter(row => 
    row.tiSlNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Dust Sensor Module</h1>
        <div className="mb-4 flex justify-center">
          <div style={{ width: '280px', marginRight: '20px' }}>
            <label htmlFor="date" className="block text-sm text-orange-600 font-semibold">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2"
            />
          </div>
          <div style={{ width: '350px' }} className="relative">
            <label htmlFor="search-sl-no" className="block text-sm text-orange-600 font-semibold text-center">Search SL.No</label>
            <input
              type="text"
              id="search-sl-no"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2"
            />
            <span className="absolute right-3 top-9">
              <img src="/src/assets/search.png" alt="Search" className="h-5 w-5" />
            </span>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200 mb-4" style={{ borderCollapse: 'collapse' }}>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-800 uppercase tracking-wider text-center" style={{ border: '1px solid #ccc', width: '25%' }}>SL.No</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-800 uppercase tracking-wider text-center" style={{ border: '1px solid #ccc', width: '25%' }}>TI SL.No</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-800 uppercase tracking-wider text-center" style={{ border: '1px solid #ccc', width: '25%' }}>Status</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-800 uppercase tracking-wider text-center" style={{ border: '1px solid #ccc', width: '25%' }}>Rejection</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <tr key={row.slNo}>
                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ border: '1px solid #ccc' }}>{row.slNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ border: '1px solid #ccc' }}>{row.tiSlNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ border: '1px solid #ccc' }}>
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
                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ border: '1px solid #ccc' }}>
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
        <div className="flex items-end justify-between mt-4">
          <div className="w-1/2">
            <label htmlFor="cleared-dust" className="block text-sm text-orange-600 font-semibold text-center">Who cleared Dust</label>
            <select
              id="cleared-dust"
              value={clearedDust}
              onChange={(e) => setClearedDust(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-2"
            >
              <option value="">Select</option>
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
