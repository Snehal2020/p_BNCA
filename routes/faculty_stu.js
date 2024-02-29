const express = require('express');
require('../db')
const cors=require('cors')
const router = express.Router()   
router.use(express.json())
const { getSpecificfaculty,facultyProject_imageController,getSinglefaculty,facultyCreateController,getfacultyController,facultyPhotoController}=require('../controllers/facultyController')
const formidable = require("express-formidable");
// router.use(formidable());
router.post('/add-faculty',formidable(),facultyCreateController)

router.get("/get-faculty", getfacultyController);

router.get("/get-faculty/:slug", getSinglefaculty);

router.get("/get-specificfaculty/:departmentId", getSpecificfaculty);
// router.get("/get-specificfaculty", getSpecificfaculty);

router.get("/faculty-photo/:pid", facultyPhotoController);

router.get("/faculty-project_images/:pid", facultyProject_imageController);

module.exports = router
