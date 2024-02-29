const facultyModel = require("../models/facultyModel");
const courseModel= require("../models/courseModel")
const departmentModel= require("../models/departmentModel")
const fs = require("fs")
const slugify = require("slugify");
var id1="65d5cfa00653e75d82bc8782";


const facultyCreateController = async (req, res) => {
    try {
      
      const { name,ta,AR,project_name,project_details,course,department } =req.fields;
      
      const { photo,project_images } = req.files;
      
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !ta:
          return res.status(500).send({ error: "ta is Required" });
        case !AR:
          return res.status(500).send({ error: "AR is Required" });
        case !course:
          return res.status(500).send({ error: "Course is Required" });
        case !department:
          return res.status(500).send({ error: "Department is Required" });
        case !project_name:
          return res.status(500).send({ error: "project_name is Required" });
        case !project_details:
          return res.status(500).send({ error: "project_details is Required" });
        // case photo && photo.size > 1000000:
        
        //   return res
        //     .status(500)
        //     .send({ error: "photo is Required and should be less then 1mb" });
        // case project_images && project_images.size > 1000000:
        
        //   return res
        //     .status(500)
        //     .send({ error: "photo is Required and should be less then 1mb" });
      
      }
     
      const faculty = new facultyModel({ ...req.fields, slug: slugify(name) });
      
      if (photo) {
        console.log(photo)
        faculty.photo.data = fs.readFileSync(photo.path);
        faculty.photo.contentType = photo.type;
      }
      if (project_images) {
        console.log(project_images)
        faculty.project_images.data = fs.readFileSync(project_images.path);
        faculty.project_images.contentType = project_images.type;
      }

      console.log("inside")
      await faculty.save();
      res.status(201).send({
        success: true,
        message: "Faculty Addes Successfully",
        faculty,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in faculty",
      });
    }
  };

  const objectIdcontroller_f=async (req,res)=>{
    const data= req.body;
    id1=data.value;
    console.log('Received data:',data.value); 
    res.send(data );
}

  const getfacultyController = async (req, res) => {
    try {
   
      const faculty = await facultyModel
        .find({})
        .sort({ createdAt: -1 });
       console.log(faculty[0].name+"--")
      res.status(200).send({
        success: true,
        countTotal: faculty.length,
        message: "ALlFaculty ",
        faculty
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting faculty",
        error: error.message,
      });
    }
  };


  const facultyPhotoController = async (req, res) => {
    try {
       
        const faculty = await facultyModel.findById(req.params.pid).select("photo");
        // const faculty = await facultyModel.findById("65ded50b5d3404b36d1b87fc").select("photo");
        
      if (faculty.photo.data) {
        res.set("Content-type", faculty.photo.contentType);
        return res.status(200).send(faculty.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  const facultyProject_imageController = async (req, res) => {
    try {
      
      const faculty = await facultyModel.findById(req.params.pid).select("project_images");
      
      if (faculty.project_images.data) {
        res.set("Content-type", faculty.project_images.contentType);
        // console.log(faculty.project_images.data)
        return res.status(200).send(faculty.project_images.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  
  const getSinglefaculty = async (req, res) => {
    try {
      const faculty = await facultyModel
        .findOne({ slug: req.params.slug }).select('name AR ta project_name project_details')
      res.status(200).send({
        success: true,
        message: "Single Faculty Fetched",
        faculty,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };
  const getSpecificfaculty = async (req, res) => {
    try {
     console.log(req.params.departmentId+"***")
      const faculty = await facultyModel
        .find({department: req.params.departmentId}).select("name AR slug project_name")
        .sort({ createdAt: -1 });
      //  console.log(faculty[0].name+"--")
      res.status(200).send({
        success: true,
        countTotal: faculty.length,
        message: "ALlFaculty ",
        faculty
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting faculty",
        error: error.message,
      });
    }
  };
  const getDepartmentName = async (req, res) => {
    try {
    
      const department = await departmentModel
        .find({_id:id1})
      res.status(200).send({
        success: true,
        message: "departmet name ",
        department
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting faculty",
        error: error.message,
      });
    }
  };
  

  module.exports={getDepartmentName,getSpecificfaculty,facultyProject_imageController,getSinglefaculty,facultyPhotoController,objectIdcontroller_f,facultyCreateController,getfacultyController}