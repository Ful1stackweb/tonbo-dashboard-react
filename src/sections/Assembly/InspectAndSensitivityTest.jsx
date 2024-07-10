import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";

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
  const [statusAll, setStatusAll] = useState("");

  const criteriaNames = [
    "Scratch",
    "Spacers",
    "Screws",
    "Loctite",
    "Serial Numbers",
    "Sensitivity",
  ];

  useEffect(() => {
    getAllSLNo();
  }, []);

  useEffect(() => {
    filterData();
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

  const filterData = () => {
    const filtered = data.filter((item) => {
      const matchesSensorType =
        formData.sensorType === "" ||
        formData.sensorType === "ALL" ||
        item.sensorType
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
    const updatedFilteredData = [...filteredData];
    updatedFilteredData[index].selected = !updatedFilteredData[index].selected;
    setFilteredData(updatedFilteredData);
    setSelectAll(
      updatedFilteredData.every((item) => item.selected) &&
        updatedFilteredData.length > 0
    );
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedFilteredData = [...filteredData];
    updatedFilteredData[index].status = newStatus;
    if (newStatus === "pass") {
      updatedFilteredData[index].criteria = Array(criteriaNames.length).fill(
        true
      );
    } else if (newStatus === "fail") {
      updatedFilteredData[index].criteria = Array(criteriaNames.length).fill(
        false
      );
    }
    setFilteredData(updatedFilteredData);
  };

  const handleCriteriaChange = (rowIndex, criteriaIndex) => {
    const updatedFilteredData = [...filteredData];
    // Toggle the specific criterion
    updatedFilteredData[rowIndex].criteria[criteriaIndex] =
      !updatedFilteredData[rowIndex].criteria[criteriaIndex];
    // Update the status based on all criteria
    updatedFilteredData[rowIndex].status = updatedFilteredData[
      rowIndex
    ].criteria.every((checked) => checked)
      ? "pass"
      : "fail";
    setFilteredData(updatedFilteredData);
  };

  const handleStatusAllChange = (newStatus) => {
    if (statusAll === newStatus) {
      const updatedFilteredData = filteredData.map((item) => ({
        ...item,
        status: "",
        criteria: Array(criteriaNames.length).fill(false),
      }));
      setFilteredData(updatedFilteredData);
      setStatusAll("");
    } else {
      const updatedFilteredData = filteredData.map((item) => ({
        ...item,
        status: newStatus,
        criteria:
          newStatus === "pass"
            ? Array(criteriaNames.length).fill(true)
            : Array(criteriaNames.length).fill(false),
      }));
      setFilteredData(updatedFilteredData);
      setStatusAll(newStatus);
    }
  };

  const saveData = async () => {
    for (let i = 0; i < filteredData.length; i++) {
      if (
        filteredData[i].status === "fail" ||
        filteredData[i].status === "pass"
      ) {
        const dataToSend = {
          criteria: filteredData[i].criteria,
          status: filteredData[i].status,
        };
        const response = await axios.put(
          `http://localhost:3000/api/assembly/${filteredData[i].tonboSlNo}`,
          dataToSend
        );
        console.log("Data for " + response.data + " Saved!");
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 mx-auto" style={{ maxWidth: "1200px" }}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Inspect & Sensitivity Test
      </h2>
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
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
          <div className="form-group">
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
              <option value="">Select Sensor Type</option>
              <option value="ALL">ALL</option>
              <option value="ATTO-Custom">ATTO-Custom</option>
              <option value="ATTO-Panhead">ATTO-Panhead</option>
              <option value="Athena-Spartan">Athena-Spartan</option>
              <option value="Athena-BHD">Athena-BHD</option>
            </select>
          </div>
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
        <table className="table-auto w-full mt-6 border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">
                Select All
                <input
                  type="checkbox"
                  style={{ marginLeft: "10px" }}
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="border py-2 px-4">TI SL.No</th>
              <th className="border py-2 px-4">
                Status
                <div className="flex justify-center mt-2">
                  <label className="mr-2">
                    P
                    <input
                      type="checkbox"
                      className="ml-1"
                      checked={statusAll === "pass"}
                      onChange={() => handleStatusAllChange("pass")}
                    />
                  </label>
                  <label>
                    F
                    <input
                      type="checkbox"
                      className="ml-1"
                      checked={statusAll === "fail"}
                      onChange={() => handleStatusAllChange("fail")}
                    />
                  </label>
                </div>
              </th>
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
                    className={`status-dropdown mt-1 block w-full border-gray-300 rounded-md shadow-sm ${
                      item.status === "pass"
                        ? "bg-green-100"
                        : item.status === "fail"
                        ? "bg-red-100"
                        : ""
                    }`}
                    value={item.status || ""}
                    onChange={(e) =>
                      handleStatusChange(rowIndex, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="pass" className="status-pass">
                      Pass
                    </option>
                    <option value="fail" className="status-fail">
                      Fail
                    </option>
                  </select>
                </td>
                <td className="border text-center py-3 px-4">
                  <div className="checklist flex flex-wrap justify-center">
                    {criteriaNames.map((criteriaName, criteriaIndex) => (
                      <label key={criteriaIndex} className="mr-2">
                        <input
                          type="checkbox"
                          checked={item.criteria?.[criteriaIndex] || false}
                          onChange={() =>
                            handleCriteriaChange(rowIndex, criteriaIndex)
                          }
                        />{" "}
                        {criteriaName}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer flex justify-end mt-6">
          <button
            className="save-button bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600"
            onClick={saveData}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectAndSensitivityTest;
