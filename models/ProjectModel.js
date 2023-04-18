const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "A project must have title"] },
    description: { type: String },
    src: {
      type: String,
    },
    liveDemo: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
