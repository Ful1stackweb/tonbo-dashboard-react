import React, { useState, useEffect } from 'react';

const NewAssembledDetector = () => {
  const [rows, setRows] = useState([
    { id: 1, tonboSlNo: '', sensorSlNo: '', proxyBoardSlNo: '', powerBoardSlNo: '' },
  ]);
  const [totalSerialCount, setTotalSerialCount] = useState(0);

  useEffect(() => {
    updateTotalSerialCount();
  }, [rows]);

  const updateTotalSerialCount = () => {
    const filledRows = rows.filter(row => row.tonboSlNo.trim() !== '');
    setTotalSerialCount(filledRows.length);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value; // Take the full input value
    setRows(newRows);

    // Check if current row is the last row
    const isLastRow = index === rows.length - 1;

    // If 'tonboSlNo' is filled in the last row, add a new row
    if (field === 'tonboSlNo' && value.trim() !== '' && isLastRow) {
      addNewRow();
    }

    // If 'tonboSlNo' is emptied and it's not the last row, delete the row
    if (field === 'tonboSlNo' && value.trim() === '' && !isLastRow) {
      deleteRow(index);
    }

    // Automatically focus on the next input field in the same column
    const nextRow = document.getElementById(`row-${index + 1}`);
    if (nextRow) {
      const nextInput = nextRow.querySelector(`input[name="${field}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, tonboSlNo: '', sensorSlNo: '', proxyBoardSlNo: '', powerBoardSlNo: '' },
    ]);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1); // Remove the row at index
    setRows(newRows);

    // Update SL.no for all remaining rows
    for (let i = index; i < newRows.length; i++) {
      newRows[i].id = i + 1;
    }

    // Update state with new row IDs
    setRows(newRows);
  };

  return (
    <div className="data p-6">
      <h2 className="text-2xl mb-4">New Assembled Detector</h2>
      <div className="form-container bg-gray-100 p-6 rounded-lg shadow-md mx-auto w-4/5">
        <div className="row-container mb-4 flex justify-between items-center">
          <div className="total-count bg-gray-200 p-2 rounded-full border-2 border-green-400 text-gray-700">
            Total Serial Numbers: <span id="total-serial-count">{totalSerialCount}</span>
          </div>
          <button
            className="save-button bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition ease-in-out"
            onClick={() => alert('Data saved!')}
          >
            Save
          </button>
        </div>

        <form className="centered-form flex flex-col w-full mx-auto">
          <div className="form-row flex justify-between items-center mb-4">
            <div className="form-group flex-1 mx-2">
              <label htmlFor="date" className="block font-bold mb-1 text-orange-600">Date</label>
              <input type="date" id="date" name="date" className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner" />
            </div>
            <div className="form-group flex-1 mx-2">
              <label htmlFor="sensor-type" className="block font-bold mb-1 text-orange-600">Type of Sensor</label>
              <select name="sensor-type" id="sensor-type" className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner">
                <option value="">Select Sensor Type</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="form-group flex-1 mx-2">
              <label htmlFor="assembled-by" className="block font-bold mb-1 text-orange-600">Who Assembled Detectors</label>
              <select name="assembled-by" id="assembled-by" className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner">
                <option value="">Select Assembler</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>

          <div className="table-container overflow-y-auto relative mb-4">
            <table id="my-table" className="table w-full border-collapse mt-1 text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">SL.no</th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">Tonbo SL.no</th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">Sensor SL. No</th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">Proxy Board SL.no</th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">Power Board SL.no</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} id={`row-${index}`}>
                    <td className="border border-gray-400">{row.id}</td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="tonboSlNo"
                        className="form-control w-11/12 p-1 border border-red-400 rounded-sm text-center m-auto block"
                        value={row.tonboSlNo}
                        onChange={(e) => handleInputChange(index, 'tonboSlNo', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="sensorSlNo"
                        className="form-control w-11/12 p-1 border border-red-400 rounded-sm text-center m-auto block"
                        value={row.sensorSlNo}
                        onChange={(e) => handleInputChange(index, 'sensorSlNo', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="proxyBoardSlNo"
                        className="form-control w-11/12 p-1 border border-red-400 rounded-sm text-center m-auto block"
                        value={row.proxyBoardSlNo}
                        onChange={(e) => handleInputChange(index, 'proxyBoardSlNo', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="powerBoardSlNo"
                        className="form-control w-11/12 p-1 border border-red-400 rounded-sm text-center m-auto block"
                        value={row.powerBoardSlNo}
                        onChange={(e) => handleInputChange(index, 'powerBoardSlNo', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAssembledDetector;
