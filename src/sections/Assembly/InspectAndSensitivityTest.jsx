import React, { useState } from "react";

const InspectAndSensitivityTest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    whoTestedSensor: "",
    sensorType: "",
    searchSLNo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateStatusCount = (e) => {
    const selectElement = e.target;
    const passCountElement = document.getElementById("pass-count");
    const failCountElement = document.getElementById("fail-count");

    let passCount = parseInt(passCountElement.textContent.split("-")[1], 10);
    let failCount = parseInt(failCountElement.textContent.split("-")[1], 10);

    const previousStatus = selectElement.getAttribute("data-previous-status");
    const newStatus = selectElement.value;

    if (previousStatus === "pass") {
      passCount--;
    } else if (previousStatus === "fail") {
      failCount--;
    }

    if (newStatus === "pass") {
      passCount++;
    } else if (newStatus === "fail") {
      failCount++;
    }

    passCountElement.textContent = "P-" + passCount;
    failCountElement.textContent = "F-" + failCount;

    selectElement.setAttribute("data-previous-status", newStatus);
  };

  const searchTable = () => {
    const input = searchTerm.toUpperCase();
    const table = document.querySelector(".table tbody");
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      const td = rows[i].getElementsByTagName("td")[1];
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  };

  return (
    <div id="data2" style={{ width: '1200px' }} className="p-4 bg-gray-100 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Inspect & Sensitivity Test</h2>
      <div style={{ height: '520px' }} className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="date" className="block text-orange-600 font-semibold">
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
              <label htmlFor="whoTestedSensor" className="block text-orange-600 font-semibold">
                Who tested Sensor
              </label>
              <select
                id="whoTestedSensor"
                name="whoTestedSensor"
                className="form-control mt-1 block border-2 border-gray-400 rounded-md h-10"
                value={formData.whoTestedSensor}
                onChange={handleInputChange}
                style={{ width: "280px" }}
              >
                <option value="">Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="sensorType" className="block text-orange-600 font-semibold">
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
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="searchSLNo" className="block text-center text-orange-600 font-semibold">
              Search SL.No
            </label>
            <div className="relative flex justify-center">
              <input
                type="text"
                id="searchSLNo"
                name="searchSLNo"
                className="form-control mt-1 border-2 border-gray-400 rounded-md pl-4 pr-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={searchTable}
                style={{ width: "300px" }}
              />
              <span className="absolute inset-y-0 flex items-center pr-3 cursor-pointer"
              style={{ right: '411px' }}
              onClick={searchTable}
              >
             <img src="/src/assets/search.png" alt="Search" className="h-5 w-5" />
              </span>

             
            </div>
          </div>
        </form>
       <table className="table-auto w-full mt-6 border-collapse">
  <thead>
    <tr>
      <th className="border py-2 px-4">Select</th>
      <th className="border py-2 px-4">TI SL.No</th>
      <th className="border py-2 px-4">Status</th>
      <th className="border py-2 px-4">Sensitivity Check List</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border text-center py-3 px-4">
        <input type="checkbox" />
      </td>
      <td className="border text-center py-3 px-4">TUV-9008555</td>
      <td className="border text-center py-3 px-4">
  <select
    className="status-dropdown mt-1 block w-full border-gray-300 rounded-md shadow-sm"
    onChange={updateStatusCount}
    data-previous-status=""
  >
    <option value="">Select</option>
    <option value="pass" className="status-pass" style={{ color: "#047857",  backgroundColor: "#D1FAE5", }}>Pass</option>
    <option value="fail" className="status-fail" style={{ color: "#B91C1C", backgroundColor: "#FEE2E2" }}>Fail</option>
                </select>
                
</td>

      <td className="border text-center py-3 px-4">
        <div className="checklist flex flex-wrap justify-center">
          <label className="mr-2"><input type="checkbox" /> criteria 1</label>
          <label className="mr-2"><input type="checkbox" /> criteria 2</label>
          <label className="mr-2"><input type="checkbox" /> criteria 3</label>
          <label className="mr-2"><input type="checkbox" /> criteria 4</label>
          <label className="mr-2"><input type="checkbox" /> criteria 5</label>
        </div>
      </td>
    </tr>
    {/* More rows can go here */}
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
