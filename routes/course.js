const express = require("express");
const {
  createCourseController,
  deleteCourseController,
  getcourseController,
  getSingleCourseController,
  updateCourseController,
  courseListController,
  coursedepartmentController,
} = require("../controllers/courseController.js");
const { isAdmin, requireSignIn } =require("../middleware/authMiddleware.js");
const formidable = require("express-formidable");

const router = express.Router();

//routes
router.post(
  "/add-course",
//   requireSignIn,
//   isAdmin,
  formidable(),
  createCourseController
);
//routes
router.put(
  "/update-course/:pid",
//   requireSignIn,
//   isAdmin,
  formidable(),
  updateCourseController
);

//get products
router.get("/get-course", getcourseController);

router.post('/receive-data',(req, res) => {
  const data= req.body;
  console.log('Received data:', data); 
  res.send(data );
});

//single product
router.get("/get-course/:slug", getSingleCourseController);

//delete rproduct
router.delete("/delete-course/:pid", deleteCourseController);

router.get("/course-list/:page", courseListController);

//category wise product
router.get("/course-department/:slug", coursedepartmentController);
module.exports= router;