import React, { useState } from 'react';

const SensorReplacement = () => {
  const [tableData, setTableData] = useState([
    { part: 'Sensor', partNo: '', date: '' },
    { part: 'Proxy Board', partNo: '', date: '' },
    { part: 'Power Board', partNo: '', date: '' },
  ]);
  const [sensorCount, setSensorCount] = useState(0);
  const [boardCount, setBoardCount] = useState(0);
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');

  const addNewColumn = () => {
    const newDate = { part: '', partNo: '', date: '' };
    setTableData([...tableData, newDate]);
  };

  const deleteColumn = (index) => {
    const newTableData = tableData.filter((_, i) => i !== index);
    setTableData(newTableData);
  };

  const saveData = () => {
    const data = {
      tableData,
      dropdown1,
      dropdown2,
      sensorCount,
      boardCount,
    };

    fetch('/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert('Data saved successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to save data.');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="header-container flex justify-center items-center relative mt-5">
        <h2 className="text-2xl font-bold">Board and Sensor Replacement</h2>
        <div className="counts-container absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
          <div className="count-box bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="count-item text-center">
              <p className="count-title text-gray-600">Sensor Count</p>
              <p className="count-value text-lg font-bold" id="sensor-count">{sensorCount}</p>
            </div>
            <div className="count-divider border-r h-8 mx-4"></div>
            <div className="count-item text-center">
              <p className="count-title text-gray-600">Board Count</p>
              <p className="count-value text-lg font-bold" id="board-count">{boardCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="search-status-container flex flex-col items-center mb-6">
          <div className="search-container flex items-center space-x-4 mb-4">
            <label htmlFor="search-sl-no" className="font-bold">Serial.No</label>
            <input type="text" id="search-sl-no" className="form-control border border-gray-300 p-2 rounded-md" />
            <button className="search-btn bg-transparent border-none cursor-pointer">
              <img src="search-icon.png" alt="Search" />
            </button>
          </div>
          <div className="status-container flex justify-center items-center border-2 border-gray-300 rounded-lg p-2 w-3/4 text-center space-x-4">
            <div className="status-box failed flex-1 bg-red-200 text-red-700 rounded-md p-2 font-bold">Failed</div>
            <div className="status-box issue flex-1 bg-green-200 text-green-700 rounded-md p-2 font-bold">Issue will be displayed</div>
          </div>
        </div>
        <table id="sensor-table" className="w-full table-fixed border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-blue-600 text-white">PARTS Name</th>
              <th className="border border-gray-300 p-2 bg-blue-600 text-white">PARTS No</th>
              <th className="border border-gray-300 p-2 bg-blue-600 text-white">
                <input type="date" name="date-1" className="form-control small-input w-full p-2 rounded-md" />
              </th>
              <th className="column-controls p-2 bg-blue-600 text-white">
                <button className="add-column-btn bg-blue-700 text-white p-1 rounded-md" onClick={addNewColumn}>Add</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{row.part}</td>
                <td className="border border-gray-300 p-2">
                  <input type="text" name="part-no" className="form-control small-input w-full p-2 rounded-md" value={row.partNo} onChange={(e) => {
                    const newTableData = [...tableData];
                    newTableData[index].partNo = e.target.value;
                    setTableData(newTableData);
                  }} />
                </td>
                <td className="border border-gray-300 p-2">
                  <input type="text" name="date-1" className="form-control small-input w-full p-2 rounded-md" value={row.date} onChange={(e) => {
                    const newTableData = [...tableData];
                    newTableData[index].date = e.target.value;
                    setTableData(newTableData);
                  }} />
                </td>
                <td className="border border-gray-300 p-2">
                  <button className="delete-column-btn bg-red-600 text-white p-1 rounded-md" onClick={() => deleteColumn(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dropdown-container flex items-center justify-between p-4 bg-gray-100 rounded-md">
          <label htmlFor="dropdown1" className="font-bold">What was changed in detector :</label>
          <select id="dropdown1" className="dropdown p-2 border border-gray-300 rounded-md" value={dropdown1} onChange={(e) => setDropdown1(e.target.value)}>
            <option value="">Board details</option>
            {/* Add other options as necessary */}
          </select>
          <select id="dropdown2" className="dropdown p-2 border border-gray-300 rounded-md" value={dropdown2} onChange={(e) => setDropdown2(e.target.value)}>
            <option value="">Who changed Boards</option>
            {/* Add other options as necessary */}
          </select>
          <button className="save-btn bg-green-600 text-white p-2 rounded-md font-bold" onClick={saveData}>SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default SensorReplacement;
