const mongoose =require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.ObjectId,
      ref: "departments",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courses", courseSchema);