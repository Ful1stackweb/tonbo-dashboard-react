const assemblymodel = require("../models/tonboassembly.js");

const date = new Date();
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const getAssembly = async (req, res) => {
  try {
    const fetchassembly = await assemblymodel.find({});
    res.status(200).json(fetchassembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssemblyByID = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchassembly = await assemblymodel.findById(id);
    res.status(200).json(fetchassembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAssembly = async (req, res) => {
  try {
    const assemblies = req.body;
    const assembly = await assemblymodel.insertMany(assemblies);
    res.status(200).json(assembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAssembly = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const assembly = await assemblymodel.findByIdAndUpdate(id, update);
    if (!assembly) {
      return res.status(404).json({ message: "Assembly not found" });
    }

    const updatedAssembly = await assemblymodel.findById(id);
    res.status(200).json(updatedAssembly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAssembly = async (req, res) => {
  try {
    const { id } = req.params;
    const assembly = await assemblymodel.findByIdAndDelete(id);
    if (!assembly) {
      return res.status(404).json({ message: "Assembly not found" });
    }
    res.status(200).json({ message: "Assembly deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssembliesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, sensorType } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Please provide both startDate and endDate" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const allAssemblies = await assemblymodel.find();

    const filteredAssemblies = allAssemblies.filter((assembly) => {
      const creationDate = new Date(assembly.creationDate);
      const isWithinDateRange = creationDate >= start && creationDate <= end;
      const matchesSensorType = sensorType
        ? assembly.sensorType === sensorType
        : true;
      return isWithinDateRange && matchesSensorType;
    });

    res.status(200).json(filteredAssemblies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSensorWiseCount = async (req, res) => {
  try {
    const sensorType = req.query.sensorType;

    const formattedDate = formatDate(date);

    const aggregationPipeline = [
      {
        $match: {
          sensorType: sensorType,
          creationDate: formattedDate,
        },
      },
      {
        $group: {
          _id: {
            date: "$creationDate",
            sensorType: "$sensorType",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          sensorType: "$_id.sensorType",
          count: 1,
        },
      },
    ];

    const result = await assemblymodel.aggregate(aggregationPipeline);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssemblyByCurrentDateType = async (req, res) => {
  try {
    const { sensorType } = req.query;
    const formattedDate = formatDate(date);

    const assemblies = await assemblymodel.find({
      sensorType: sensorType,
      creationDate: formattedDate,
    });

    res.status(200).json(assemblies);
  } catch (error) {}
};

module.exports = {
  getAssembly,
  getAssemblyByID,
  addAssembly,
  updateAssembly,
  deleteAssembly,
  getAssembliesByDateRange,
  getSensorWiseCount,
  getAssemblyByCurrentDateType,
};
