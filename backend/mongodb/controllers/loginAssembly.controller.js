const userLoginAssemblymodel = require("../models/loginAssembly.js");

const getUserAssemblybyID = async (req, res) => {
  try {
    const { userUid } = req.params;
    const fetchLoggedinUser = await userLoginAssemblymodel.findOne({
      userId: userUid,
    });
    res.status(200).json(fetchLoggedinUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUserAssembly = async (req, res) => {
  try {
    const user = req.body;
    const userData = await userLoginAssemblymodel.create(user);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUserAssembly,
  getUserAssemblybyID,
};
