const mongoose =require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    department: {
      type: mongoose.ObjectId,
      ref: "departments",
      required: true,
    },
    course: {
        type: mongoose.ObjectId,
        ref: "courses",
        required: true,
      },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    ta:{
        type: String,
      required: true,
    },
    AR:{
        type: String,
      required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
      },
      project_name: {
        type: String,
        required: true,
      },

    project_details: {
      type: String,
      required: true,
    },
    project_images: 
      {
        data: Buffer,
        contentType: String,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);