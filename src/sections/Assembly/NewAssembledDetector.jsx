import React, { useState, useEffect } from "react";
import axios from "axios";

const NewAssembledDetector = ({ userData }) => {
  const [rows, setRows] = useState([
    {
      tonboSlNo: "",
      sensorSlNo: "",
      proxyBoardSlNo: "",
      powerBoardSlNo: "",
      fpgaBoardSlNo: "",
    },
  ]);
  const [totalSerialCount, setTotalSerialCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    updateTotalSerialCount();
    setUserId(userData.userId);
    setCurrentDate(new Date().toISOString().substr(0, 10));

    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges, userData.userId]);

  const updateTotalSerialCount = () => {
    const filledRows = rows.filter((row) => row.tonboSlNo.trim() !== "");
    setTotalSerialCount(filledRows.length);
  };

  const handleInputChange = (index, field, value, isScanner = false) => {
    const limits = {
      tonboSlNo: 11,
      sensorSlNo: 9,
      proxyBoardSlNo: 11,
      powerBoardSlNo: 5,
      fpgaBoardSlNo: 5,
    };

    // Ensure value does not exceed the character limit for manual input
    if (!isScanner && value.length > limits[field]) {
      value = value.slice(0, limits[field]);
    }

    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    setUnsavedChanges(true);

    // Automatically move to the next row for scanner input or if manual input reaches the character limit
    if (isScanner || (!isScanner && value.length === limits[field])) {
      autoShiftFocus(index, field);
    }
  };

  const autoShiftFocus = (index, field) => {
    const nextRowIndex = index + 1;

    if (nextRowIndex < rows.length) {
      const nextInput = document.querySelector(
        `#row-${nextRowIndex} input[name="${field}"]`
      );
      if (nextInput) {
        nextInput.focus();
      }
    } else {
      addNewRow(() => {
        const newInput = document.querySelector(
          `#row-${nextRowIndex} input[name="${field}"]`
        );
        if (newInput) {
          newInput.focus();
        }
      });
    }
  };

  const addNewRow = (callback) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        tonboSlNo: "",
        sensorSlNo: "",
        proxyBoardSlNo: "",
        powerBoardSlNo: "",
        fpgaBoardSlNo: "",
      },
    ]);
    setUnsavedChanges(true);
    updateTotalSerialCount();

    // Use a timeout to ensure the new row is added to the DOM before focusing
    setTimeout(() => {
      if (callback) callback();
    }, 0);
  };

  const deleteRow = (index) => {
    if (index !== 0) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
      setUnsavedChanges(true);
      updateTotalSerialCount();
    }
  };

  const saveData = async () => {
    try {
      const filledRows = rows.filter((row) => row.tonboSlNo.trim() !== "");
      const date = new Date();

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };

      const formattedDate = formatDate(date);

      for (let i = 0; i < filledRows.length; i++) {
        const dataToSend = {
          tonboSlNo: filledRows[i].tonboSlNo,
          sensorSlNo: filledRows[i].sensorSlNo,
          proxyBoardSlNo: filledRows[i].proxyBoardSlNo,
          powerBoardSlNo: filledRows[i].powerBoardSlNo,
          fpgaBoardSlNo: filledRows[i].fpgaBoardSlNo,
          sensorType: sensorType,
          userId: userId,
          creationDate: formattedDate,
        };

        const response = await axios.post(
          "http://localhost:3000/api/assembly",
          dataToSend
        );
        console.log(`Data ${i + 1} sent to server:`, response.data);
      }
      setRows([
        {
          tonboSlNo: "",
          sensorSlNo: "",
          proxyBoardSlNo: "",
          powerBoardSlNo: "",
          fpgaBoardSlNo: "",
        },
      ]);
      setUnsavedChanges(false);
      updateTotalSerialCount();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="data p-6">
      <h2 className="text-2xl mb-4 text-center">New Assembled Detector</h2>
      <div className="form-container bg-gray-100 p-6 rounded-lg shadow-md mx-auto w-4/5">
        <div className="row-container mb-4 flex justify-between items-center">
          <div className="total-count flex items-center bg-blue-200 p-2 rounded-full border-2 border-blue-400 text-gray-700 font-semibold shadow-lg">
            <span className="mr-2">Total Serial Numbers:</span>
            <span id="total-serial-count">{totalSerialCount}</span>
          </div>
          <div className="form-group flex-1 mx-2 text-center">
            <label
              htmlFor="sensor-type"
              className="block font-bold mb-1 text-orange-600"
            >
              Type of Sensor
            </label>
            <select
              name="sensor-type"
              id="sensor-type"
              className="form-control p-2 border border-gray-300 rounded-md shadow-inner mx-auto"
              style={{ width: "200px" }} // Adjust the width as needed
              value={sensorType}
              onChange={(e) => setSensorType(e.target.value)}
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
          <button
            className="save-button bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition ease-in-out"
            onClick={saveData}
          >
            Save
          </button>
        </div>

        <form className="centered-form flex flex-col w-full mx-auto">
          <div className="table-container overflow-x-auto max-h-96 relative mb-4">
            <table
              id="my-table"
              className="table w-full border-collapse mt-1 text-center"
            >
              <thead>
                <tr>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold sticky left-0 z-10">
                    SL.no
                  </th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">
                    Tonbo SL.no
                  </th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">
                    Sensor SL. No
                  </th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">
                    Proxy Board SL.no
                  </th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">
                    Power Board SL.no
                  </th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">
                    FPGA Board SL.no
                  </th>
                  <th className="border border-gray-400 bg-gray-200 text-blue-900 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} id={`row-${index}`}>
                    <td className="border border-gray-400 sticky left-0 bg-gray-100 font-semibold">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="tonboSlNo"
                        className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner"
                        value={row.tonboSlNo}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "tonboSlNo",
                            e.target.value,
                            e.nativeEvent.inputType === "insertFromPaste" ||
                              e.nativeEvent.isComposing
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="sensorSlNo"
                        className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner"
                        value={row.sensorSlNo}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "sensorSlNo",
                            e.target.value,
                            e.nativeEvent.inputType === "insertFromPaste" ||
                              e.nativeEvent.isComposing
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="proxyBoardSlNo"
                        className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner"
                        value={row.proxyBoardSlNo}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "proxyBoardSlNo",
                            e.target.value,
                            e.nativeEvent.inputType === "insertFromPaste" ||
                              e.nativeEvent.isComposing
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="powerBoardSlNo"
                        className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner"
                        value={row.powerBoardSlNo}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "powerBoardSlNo",
                            e.target.value,
                            e.nativeEvent.inputType === "insertFromPaste" ||
                              e.nativeEvent.isComposing
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400">
                      <input
                        type="text"
                        name="fpgaBoardSlNo"
                        className="form-control w-full p-2 border border-gray-300 rounded-md shadow-inner"
                        value={row.fpgaBoardSlNo}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "fpgaBoardSlNo",
                            e.target.value,
                            e.nativeEvent.inputType === "insertFromPaste" ||
                              e.nativeEvent.isComposing
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-400">
                      <button
                        type="button"
                        className="delete-button bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 transition ease-in-out"
                        onClick={() => deleteRow(index)}
                      >
                        Delete
                      </button>
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
