const assemblymodel = require("../models/tonboassembly.js");

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

module.exports = {
  getAssembly,
  getAssemblyByID,
  addAssembly,
  updateAssembly,
  deleteAssembly,
};
