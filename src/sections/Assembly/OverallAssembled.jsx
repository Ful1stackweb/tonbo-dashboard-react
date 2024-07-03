import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";

const OverallAssembled = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [allData, setAllData] = useState([]);
  const [uniqueItems, setUniqueItems] = useState([]);
  const [countData, setCountData] = useState([]);
  const [countValue, setCountValue] = useState();

  const fetchDateWiseRangeCount = async () => {
    if (endDate === "") {
      return;
    }
    try {
      const resp = await axios.get(
        `http://localhost:3000/api/assembly/getAssemblybyDateRange?startDate=${startDate}&endDate=${endDate}&sensorType=${typeFilter}`
      );
      const data = resp.data;
      setCountValue(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("Invalid selected date range");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/assembly/");
        setAllData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchDateWiseRangeCount();
  }, [endDate, startDate, typeFilter]);

  useEffect(() => {
    if (allData.length > 0) {
      const sensorValues = new Set();

      const unique = allData.filter((item) => {
        const isDuplicate = sensorValues.has(item.sensorType);
        sensorValues.add(item.sensorType);
        return !isDuplicate;
      });

      setUniqueItems(unique);

      const fetchCount = async () => {
        try {
          const responses = await Promise.all(
            unique.map(async (sensorT) => {
              try {
                const response = await axios.get(
                  `http://localhost:3000/api/assembly/sensor/count?sensorType=${sensorT.sensorType}`
                );
                return response.data;
              } catch (error) {
                console.error(
                  "Error fetching count data for sensor type",
                  error
                );
                return null;
              }
            })
          );

          setCountData(responses);
        } catch (error) {
          console.error("Error fetching count data:", error);
        }
      };

      fetchCount();
    }
  }, [allData]);

  const handleDownload = async () => {
    if (new Date(startDate) > new Date(endDate)) {
      alert("Invalid selected date range");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/assembly/getAssemblybyDateRange?startDate=${startDate}&endDate=${endDate}&sensorType=${typeFilter}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("No data found for the selected date range");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");

      worksheet.columns = [
        { header: "Date", key: "creationDate", width: 15 },
        { header: "Sensor Type", key: "sensorType", width: 20 },
        { header: "Tonbo Serial Number", key: "tonboSlNo", width: 20 },
      ];

      data.forEach((row) => {
        worksheet.addRow({
          creationDate: row.creationDate,
          sensorType: row.sensorType,
          tonboSlNo: row.tonboSlNo,
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "OverallAssembled.xlsx");
    } catch (error) {
      console.error("Error during download:", error.message);
    }
  };

  const handleDownloadCurrentDayData = async (sensorType) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/assembly/sensor/currentDay?sensorType=${sensorType}`
      );
      const data = await response.json();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");

      worksheet.columns = [
        { header: "Date", key: "creationDate", width: 15 },
        { header: "Sensor Type", key: "sensorType", width: 20 },
        { header: "Tonbo Serial Number", key: "tonboSlNo", width: 20 },
      ];

      data.forEach((row) => {
        worksheet.addRow({
          creationDate: row.creationDate,
          sensorType: row.sensorType,
          tonboSlNo: row.tonboSlNo,
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "OverallAssembledCurrentDay.xlsx");
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  return (
    <div
      style={{ maxWidth: "1200px" }}
      className="bg-white shadow-md rounded-lg p-6 mx-auto my-10"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Overall Assembled</h1>

      <div className="text-center mb-6">
        <div className="inline-block p-4 rounded-lg bg-gray-100 mb-6">
          <span className="mr-4">New detectors</span>
          {uniqueItems.map((sensorT) => (
            <button
              key={sensorT._id}
              onClick={() => setTypeFilter(sensorT.sensorType)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              {sensorT.sensorType}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-1/2 p-4 border border-black rounded-lg">
          <h3 className="text-xl font-bold text-red-500 mb-4 text-center">
            New Detector Assembled
          </h3>
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr>
                <th className="border border-black p-2 text-center">Date</th>
                <th className="border border-black p-2 text-center">Type</th>
                <th className="border border-black p-2 text-center">Count</th>
                <th className="border border-black p-2 text-center">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {countData.map(
                (item, index) =>
                  item.length > 0 && (
                    <tr key={index}>
                      <td className="border border-black p-2 text-center">
                        {item[0].date}{" "}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {item[0].sensorType}{" "}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {item[0].count}{" "}
                      </td>
                      <td className="border border-black p-2 text-center">
                        <button
                          onClick={() =>
                            handleDownloadCurrentDayData(item[0].sensorType)
                          }
                          className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                        >
                          <FaDownload />
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        <div className="w-1/2 p-4 border border-black rounded-lg ml-4">
          <h3 className="text-xl font-bold text-red-500 mb-4 text-center">
            Date wise count Assembled
          </h3>
          <div className="flex justify-around items-center mb-4">
            <label className="block text-red-500 font-semibold">
              Start:
              <input
                type="date"
                className="ml-2 p-1 border text-gray-700 border-black rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="block text-red-500 font-semibold">
              End:
              <input
                type="date"
                className="ml-2 p-1 border text-gray-700 border-black rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label className="block text-red-500 font-semibold">
              Type:
              <select
                className="ml-2 p-1 border text-gray-700 border-black rounded"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="ATTO-Custom">ATTO-Custom</option>
                <option value="ATTO-Panhead">ATTO-Panhead</option>
                <option value="Athena-Spartan">Athena-Spartan</option>
                <option value="Athena-BHD">Athena-BHD</option>
              </select>
            </label>
          </div>
          <div className="flex justify-center items-center">
            <table className="w-24 border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-center">Count</th>
                  <th className="border border-black p-2 text-center">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">
                    {countValue || 0}
                  </td>
                  <td className="border border-black p-2 text-center">
                    <button
                      onClick={handleDownload}
                      className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                    >
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
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg">
          DONE
        </button>
      </div>
    </div>
  );
};

export default OverallAssembled;
