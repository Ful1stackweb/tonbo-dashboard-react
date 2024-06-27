const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const loginAssemblySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LoginAssembly = mongoose.model("LoginAssembly", loginAssemblySchema);

module.exports = LoginAssembly;
