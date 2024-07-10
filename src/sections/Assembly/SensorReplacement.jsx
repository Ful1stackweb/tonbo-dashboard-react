import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import Multiselect from "multiselect-react-dropdown";

const SensorReplacement = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedTonboData, setSelectedTonboData] = useState({});
  const [sensorCount, setSensorCount] = useState(0);
  const [boardCount, setBoardCount] = useState(0);
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [selectedTonboSlNos, setSelectedTonboSlNos] = useState([]);
  const [criteriaValue, setCriteriaValue] = useState("");

  const DatePickerHeader = ({ selectedDate, onChange }) => {
    return (
      <th className="border border-gray-300 p-2 bg-blue-600 text-white text-center">
        <input
          type="date"
          value={selectedDate}
          onChange={onChange}
          className="bg-transparent text-white border-none outline-none"
        />
      </th>
    );
  };

  const criteriaValues = [
    "Scratch",
    "Spacers",
    "Screws",
    "Loctite",
    "Serial Numbers",
    "Sensitivity",
  ];

  const handleSelect = (selectedList) => {
    setSelectedTonboSlNos(selectedList);
    const selectedData = data.find(
      (item) => item.tonboSlNo === selectedList[0]?.tonboSlNo
    );
    setSelectedTonboData(selectedData || {});
  };

  useEffect(() => {
    if (selectedTonboData.criteria) {
      const trueIndex = selectedTonboData.criteria.findIndex(
        (item) => item === true
      );
      if (trueIndex !== -1) {
        setCriteriaValue(criteriaValues[trueIndex]);
      } else {
        setCriteriaValue("");
      }

      setTableData([
        { part: "Sensor", partNo: selectedTonboData.sensorSlNo, newPartNo: "" },
        {
          part: "Proxy Board",
          partNo: selectedTonboData.proxyBoardSlNo,
          newPartNo: "",
        },
        {
          part: "Power Board",
          partNo: selectedTonboData.powerBoardSlNo,
          newPartNo: "",
        },
        {
          part: "FPGA Board",
          partNo: selectedTonboData.fpgaBoardSlNo,
          newPartNo: "",
        },
      ]);
    }
  }, [selectedTonboData]);

  const handleSave = () => {
    const data = {
      tableData,
      dropdown1,
      dropdown2,
      sensorCount,
      boardCount,
    };

    fetch("/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to save data.");
      });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    setTableData((prevData) =>
      prevData.map((row) => ({ ...row, date: today }))
    );
    getAllFailSensors();
  }, []);

  const getAllFailSensors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/assembly/fail"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const options = useMemo(
    () => data.map((item) => ({ tonboSlNo: item.tonboSlNo })),
    [data]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="header-container flex justify-center items-center mt-5">
        <h2 className="text-2xl font-bold">Board and Sensor Replacement</h2>
      </div>
      <div className="counts-container flex justify-end items-center space-x-4 mt-5">
        <div className="count-box bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="count-item text-center">
            <p className="count-title text-gray-600">Sensor Count</p>
            <p className="count-value text-lg font-bold" id="sensor-count">
              {sensorCount}
            </p>
          </div>
          <div className="count-divider border-r h-8 mx-4"></div>
          <div className="count-item text-center">
            <p className="count-title text-gray-600">Board Count</p>
            <p className="count-value text-lg font-bold" id="board-count">
              {boardCount}
            </p>
          </div>
        </div>
      </div>
      <div className="content-container bg-white p-6 rounded-lg shadow-md -mb-4 mt-6">
        <div className="search-status-container flex flex-col items-center mb-6 ">
          <div className="search-container flex items-center space-x-4 mb-4 mt-[-6rem]">
            <label htmlFor="search-sl-no" className="font-bold">
              Serial.No
            </label>
            <Multiselect
              options={options}
              displayValue="tonboSlNo"
              selectedValues={selectedTonboSlNos}
              onSelect={handleSelect}
              onRemove={handleSelect}
              selectionLimit={1}
            />
          </div>
          {selectedTonboData.tonboSlNo && (
            <div className="status-container flex justify-center items-center border-2 border-gray-300 rounded-lg p-2 text-center space-x-4">
              <div className="status-box failed w-40 bg-red-200 text-red-700 rounded-md p-2 font-bold text-sm">
                {selectedTonboData.status || "No data found"}
              </div>
              <div className="status-box issue w-60 bg-green-200 text-green-700 rounded-md p-2 font-bold text-sm">
                {criteriaValue || "No issues found"}
              </div>
            </div>
          )}
        </div>
        <table
          id="sensor-table"
          className="w-3/5 mx-auto table-fixed border-collapse border border-gray-300 mb-6"
        >
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-blue-600 text-white text-center">
                PARTS Name
              </th>
              <th className="border border-gray-300 p-2 bg-blue-600 text-white text-center">
                PARTS No
              </th>
              <DatePickerHeader
                selectedDate={selectedDate}
                onChange={handleDateChange}
              />
            </tr>
          </thead>
          {selectedTonboData.tonboSlNo && (
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">
                    {row.part}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {row.partNo}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="text"
                      className="form-control bg-blue-100 w-full p-2 rounded-md"
                      value={row.newPartNo}
                      onChange={(e) => {
                        const newTableData = [...tableData];
                        newTableData[index].newPartNo = e.target.value;
                        setTableData(newTableData);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="dropdown-container flex items-center justify-between p-4 bg-gray-100 rounded-md">
          <div className="flex items-center">
            <label htmlFor="dropdown1" className="font-bold mr-2">
              What was changed in detector:
            </label>
            <select
              id="dropdown1"
              className="dropdown p-2 border border-gray-300 rounded-md"
              value={dropdown1}
              onChange={(e) => setDropdown1(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="">Board details</option>
              {/* Add other options as necessary */}
            </select>
          </div>
          <div className="flex flex-1 justify-center">
            <select
              id="dropdown2"
              className="dropdown p-2 border border-gray-300 rounded-md"
              value={dropdown2}
              onChange={(e) => setDropdown2(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="">Board details</option>
              {/* Add other options as necessary */}
            </select>
          </div>
          <div className="flex items-center">
            <button
              className="save-btn bg-green-600 text-white p-2 rounded-md font-bold"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorReplacement;
