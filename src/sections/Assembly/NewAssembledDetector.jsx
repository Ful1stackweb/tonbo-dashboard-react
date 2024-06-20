import React, { useState } from 'react';

const NewAssembledDetector = () => {
  const [rows, setRows] = useState([
    { id: 1, tonboSlNo: '', sensorSlNo: '', proxyBoardSlNo: '', powerBoardSlNo: '' },
  ]);
  const [totalSerialCount, setTotalSerialCount] = useState(0);

  const saveData = () => {
    // Your save functionality goes here
    alert('Data saved!');
  };

  const addNewRow = (index) => {
    const newRows = [...rows];
    if (newRows[index].tonboSlNo.trim() !== '') {
      setRows([
        ...newRows,
        { id: rows.length + 1, tonboSlNo: '', sensorSlNo: '', proxyBoardSlNo: '', powerBoardSlNo: '' },
      ]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);

    if (field === 'tonboSlNo') {
      const filledRows = newRows.filter(row => row.tonboSlNo.trim() !== '');
      setTotalSerialCount(filledRows.length);
      addNewRow(index);
    }
  };

  return (
    <div className="data">
      <h2 className="text-2xl mb-4">New Assembled Detector</h2>
      <div className="form-container">
        <div className="row-container mb-4 flex justify-between items-center">
          <div className="total-count">
            Total Serial Numbers: <span id="total-serial-count">{totalSerialCount}</span>
          </div>
          <button
            className="save-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            onClick={saveData}
          >
            Save
          </button>
        </div>

        <form className="centered-form">
          <div className="form-row mb-4">
            <div className="form-group col-md-4">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="sensor-type">Type of Sensor</label>
              <select name="sensor-type" id="sensor-type" className="form-control">
                <option value="">Select Sensor Type</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="assembled-by">Who Assembled Detectors</label>
              <select name="assembled-by" id="assembled-by" className="form-control">
                <option value="">Select Assembler</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>

          <div className="table-container mb-4">
            <table id="my-table" className="table">
              <thead>
                <tr>
                  <th>SL.no</th>
                  <th>Tonbo SL.no</th>
                  <th>Sensor SL. No</th>
                  <th>Proxy Board SL.no</th>
                  <th>Power Board SL.no</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <input
                        type="text"
                        name="tonbo-sl-no"
                        className="form-control small-input"
                        value={row.tonboSlNo}
                        onChange={(e) => handleInputChange(index, 'tonboSlNo', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="sensor-sl-no"
                        className="form-control small-input"
                        value={row.sensorSlNo}
                        onChange={(e) => handleInputChange(index, 'sensorSlNo', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="proxy-board-sl-no"
                        className="form-control small-input"
                        value={row.proxyBoardSlNo}
                        onChange={(e) => handleInputChange(index, 'proxyBoardSlNo', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="power-board-sl-no"
                        className="form-control small-input"
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
