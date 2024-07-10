const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const tonboAssemblySchema = new mongoose.Schema(
  {
    tonboSlNo: {
      type: String,
      required: true,
      unique: true,
    },
    sensorSlNo: {
      type: String,
      required: true,
      unique: true,
    },
    proxyBoardSlNo: {
      type: String,
      required: true,
      unique: true,
    },
    powerBoardSlNo: {
      type: String,
      required: true,
      unique: true,
    },
    sensorType: {
      type: String,
      required: true,
    },
    fpgaBoardSlNo: {
      type: String,
      required: true,
      unique: true,
    },
    criteria: {
      type: [Boolean],
    },
    status: {
      type: String,
      default: "none",
    },
    userId: {
      type: String,
      required: true,
    },
    creationDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TonboAssembly = mongoose.model("TonboAssembly", tonboAssemblySchema);

module.exports = TonboAssembly;
