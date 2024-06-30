import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const OverallAssembled = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [count, setCount] = useState(0);

  const rows = [
    { date: '25-06-2024', type: 'ATTO', count: 5 },
    { date: '27-06-2024', type: 'ATHENA', count: 3 },
    { date: '28-06-2024', type: 'ATTO', count: 2 },
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
        if (typeFilter !== 'all' && row.type !== typeFilter) {
          return;
        }
        totalCount += row.count;
      });

      setCount(totalCount);
    };

    filterRows();
  }, [startDate, endDate, typeFilter]);

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Serial Number', key: 'serialNumber', width: 20 },
    ];

    rows.forEach((row) => {
      if (
        (!startDate || new Date(row.date) >= new Date(startDate)) &&
        (!endDate || new Date(row.date) <= new Date(endDate)) &&
        (typeFilter === 'all' || row.type === typeFilter)
      ) {
        for (let i = 0; i < row.count; i++) {
          worksheet.addRow({
            date: row.date,
            type: row.type,
            serialNumber: `SN${i + 1}`, // Example serial number generation
          });
        }
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'OverallAssembled.xlsx');
  };

  return (
    <div style={{ maxWidth: '1200px' }} className="bg-white shadow-md rounded-lg p-6 mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">Overall Assembled</h1>
      
      <div className="text-center mb-6">
        <div className="inline-block p-4 rounded-lg bg-gray-100 mb-6">
          <span className="mr-4">New detectors</span>
          <button onClick={() => setTypeFilter('ATTO')} className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2">ATTO</button>
          <button onClick={() => setTypeFilter('ATHENA')} className="bg-blue-500 text-white py-2 px-4 rounded-lg">ATHENA</button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-1/2 p-4 border border-black rounded-lg">
          <h3 className="text-xl font-bold text-red-500 mb-4 text-center">New Detector Assembled</h3>
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr>
                <th className="border border-black p-2 text-center">Date</th>
                <th className="border border-black p-2 text-center">Type</th>
                <th className="border border-black p-2 text-center">Count</th>
                <th className="border border-black p-2 text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                (typeFilter === 'all' || row.type === typeFilter) && (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">{row.date}</td>
                    <td className="border border-black p-2 text-center">{row.type}</td>
                    <td className="border border-black p-2 text-center">{row.count}</td>
                    <td className="border border-black p-2 text-center">
                      <button onClick={() => handleDownload(row)} className="bg-gray-200 text-gray-700 py-1 px-3 rounded">
                        <FaDownload />
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="w-1/2 p-4 border border-black rounded-lg ml-4">
          <h3 className="text-xl font-bold text-red-500 mb-4 text-center">Date wise count Assembled</h3>
          <div className="flex justify-around items-center mb-4">
            <label className="block text-red-500 font-semibold">
              Start:
              <input type="date" className="ml-2 p-1 border text-gray-700 border-black rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label className="block text-red-500 font-semibold">
              End:
              <input type="date" className="ml-2 p-1 border text-gray-700 border-black rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <label className="block text-red-500 font-semibold">
              Type:
              <select className="ml-2 p-1 border text-gray-700 border-black rounded" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="ATTO">ATTO</option>
                <option value="ATHENA">ATHENA</option>
              </select>
            </label>
          </div>
          <div className="flex justify-center items-center">
            <table className="w-24 border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-center">Count</th>
                  <th className="border border-black p-2 text-center">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">{count}</td>
                  <td className="border border-black p-2 text-center">
                    <button onClick={handleDownload} className="bg-gray-200 text-gray-700 py-1 px-3 rounded">
                      <FaDownload />
                    </button>
                  </td>
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
