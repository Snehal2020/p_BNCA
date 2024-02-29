const deptModel = require("../models/departmentModel")
const slugify = require("slugify");

const addDeptController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingDept = await deptModel.findOne({ name });
    if (existingDept) {
      return res.status(200).send({
        success: false,
        message: "Department Already Exisits",
      });
    }
    const department = await new deptModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new department created",
      department,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in department",
    });
  }
};

const dept_Controlller = async (req, res) => {
    try {
      const department = await deptModel.find({});
      res.status(200).send({
        success: true,
        message: "All Departments List",
        department,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };

  const updateDeptController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const department = await deptModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Department Updated Successfully",
        department,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category",
      });
    }
  };
  
  // single category
  const singleDeptController = async (req, res) => {
    try {
      const department = await deptModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get Single Department SUccessfully",
        department,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };
  
  //delete category
   const deleteDeptController = async (req, res) => {
    try {
      const { id } = req.params;
      await deptModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };

  module.exports={addDeptController,dept_Controlller,deleteDeptController,updateDeptController,singleDeptController}