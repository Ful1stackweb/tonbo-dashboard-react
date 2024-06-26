const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const tonboAssemblySchema = new mongoose.Schema(
  {
    tonboSlNo: {
      type: String,
      required: true,
    },
    sensorSlNo: {
      type: String,
      required: true,
    },
    proxyBoardSlNo: {
      type: String,
      required: true,
    },
    powerBoardSlNo: {
      type: String,
      required: true,
    },
    sensorType: {
      type: String,
      required: true,
    },

    userId: {
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
