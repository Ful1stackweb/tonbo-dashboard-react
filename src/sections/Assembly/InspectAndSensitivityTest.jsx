import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useMemo, useState } from "react";

const InspectAndSensitivityTest = () => {
  const [selectedTonboSlNos, setSelectedTonboSlNos] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    whoTestedSensor: "",
    sensorType: "",
    searchSLNo: "",
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getAllSLNo();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSensorType = item.sensorType
        .toString()
        .toLowerCase()
        .includes(formData.sensorType.toLowerCase());
      const matchesDate = item.createdAt.includes(formData.date);

      const matchesSelectedTonboSlNos =
        selectedTonboSlNos.length === 0 ||
        selectedTonboSlNos.some(
          (selected) => selected.tonboSlNo === item.tonboSlNo
        );

      return matchesSensorType && matchesDate && matchesSelectedTonboSlNos;
    });

    setFilteredData(filtered);
  }, [data, formData, selectedTonboSlNos]);

  const getAllSLNo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/assembly");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelect = (selectedList) => {
    setSelectedTonboSlNos(selectedList);
  };

  const options = useMemo(
    () => data.map((item) => ({ tonboSlNo: item.tonboSlNo })),
    [data]
  );

  const handleSelectAll = () => {
    const updatedFilteredData = filteredData.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setFilteredData(updatedFilteredData);
    setSelectAll(!selectAll);
  };

  const handleRowSelection = (index) => {
    const updatedFilteredData = filteredData.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    setFilteredData(updatedFilteredData);
    if (!updatedFilteredData.every((item) => item.selected)) {
      setSelectAll(false);
    }
  };

  const handleStatusChange = (index, newStatus) => {
  const updatedFilteredData = filteredData.map((item, i) =>
    i === index
      ? {
          ...item,
          status: newStatus,
          criteria: newStatus === "pass"
            ? [true, true, true, true, true]
            : newStatus === "fail"
            ? [false, false, false, false, false]
            : item.criteria,
        }
      : item
  );
  setFilteredData(updatedFilteredData);
};


  const handleCriteriaChange = (rowIndex, criteriaIndex) => {
    const updatedFilteredData = filteredData.map((item, i) =>
      i === rowIndex
        ? {
            ...item,
            criteria: item.criteria.map((checked, j) =>
              j === criteriaIndex ? !checked : checked
            ),
            status: item.criteria.every((checked, j) =>
              j === criteriaIndex ? !checked : checked
            )
              ? "pass"
              : "fail",
          }
        : item
    );
    setFilteredData(updatedFilteredData);
  };

  return (
    <div
      id="data2"
      className="p-4 bg-gray-100 mx-auto"
      style={{ width: "1200px" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Inspect & Sensitivity Test
      </h2>
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label
                htmlFor="date"
                className="block text-orange-600 font-semibold"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control mt-1 block border-2 border-gray-400 rounded-md h-10"
                value={formData.date}
                onChange={handleInputChange}
                style={{ width: "280px" }}
              />
            </div>
          </div>
          <div className="form-group mt-4">
            <label
              htmlFor="sensorType"
              className="block text-orange-600 font-semibold"
            >
              Type of Sensor
            </label>
            <select
              id="sensorType"
              name="sensorType"
              className="form-control mt-1 block border-2 border-gray-400 rounded-md h-10"
              value={formData.sensorType}
              onChange={handleInputChange}
              style={{ width: "280px" }}
            >
             <option value="" disabled hidden>
                  Select Sensor Type
                </option>
              <option value="ATTO-Custom">ATTO-Custom</option>
                <option value="ATTO-Panhead">ATTO-Panhead</option>
                <option value="Athena-Spartan">Athena-Spartan</option>
                <option value="Athena-BHD">Athena-BHD</option>
            </select>
          </div>
          <div className="form-group mt-4">
            <label
              htmlFor="searchSLNo"
              className="block text-center text-orange-600 font-semibold"
            >
              Search SL.No
            </label>
            <div className="relative flex justify-center">
              <Multiselect
                options={options}
                displayValue="tonboSlNo"
                selectedValues={selectedTonboSlNos}
                onSelect={handleSelect}
                onRemove={handleSelect}
              />
            </div>
          </div>
        </div>
        <table className="table-auto w-full mt-6 border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">Select All 
                <input
                  type="checkbox"
                  style={{ marginLeft: '10px' }}
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                
              </th>
              <th className="border py-2 px-4">TI SL.No</th>
              <th className="border py-2 px-4">Status</th>
              <th className="border py-2 px-4">Inspection Check List</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, rowIndex) => (
              <tr key={item._id}>
                <td className="border text-center py-3 px-4">
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() => handleRowSelection(rowIndex)}
                  />
                </td>
                <td className="border text-center py-3 px-4">
                  {item.tonboSlNo}
                </td>
                <td className="border text-center py-3 px-4">
                  <select
                    className="status-dropdown mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={item.status || ""}
                    onChange={(e) =>
                      handleStatusChange(rowIndex, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option
                      value="pass"
                      className="status-pass"
                      style={{ color: "#047857", backgroundColor: "#D1FAE5" }}
                    >
                      Pass
                    </option>
                    <option
                      value="fail"
                      className="status-fail"
                      style={{ color: "#B91C1C", backgroundColor: "#FEE2E2" }}
                    >
                      Fail
                    </option>
                  </select>
                </td>

                <td className="border text-center py-3 px-4">
                  <div className="checklist flex flex-wrap justify-center">
                    {Array.from({ length: 5 }).map((_, criteriaIndex) => (
                      <label key={criteriaIndex} className="mr-2">
                        <input
                          type="checkbox"
                          checked={item.criteria?.[criteriaIndex] || false}
                          onChange={() =>
                            handleCriteriaChange(rowIndex, criteriaIndex)
                          }
                        />{" "}
                        criteria {criteriaIndex + 1}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer flex justify-end mt-6">
          <button className="save-button bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectAndSensitivityTest;
