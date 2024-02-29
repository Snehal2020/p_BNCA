const express = require('express');
const {requireSignIn,isAdmin} = require('../middleware/authMiddleware')
require('../db')
const cors=require('cors')
const {
    addDeptController,
    dept_Controlller,
    updateDeptController,
    deleteDeptController,
    singleDeptController

  } = require("./../controllers/dep_controller");
  const {getDepartmentName}=require('./../controllers/facultyController')

const router = express.Router() 
router.use(express.json())

router.post(
    "/add_department",
    cors(), 
    // requireSignIn,
    // isAdmin,
   addDeptController
  );
  router.get('/test-cors', (req, res) => {
    res.send( 'CORS is configured correctly!' );
  });
  
  router.get("/get_department", cors(),  dept_Controlller);
 

  router.put(
    "/update-department/:id",
    // requireSignIn,
    // isAdmin,
    updateDeptController
  );
  
  //single category
  router.get("/single-department/:slug", singleDeptController);

  router.get("/departmentname",getDepartmentName);
  
  //delete category
  router.delete(
    "/delete-department/:id",
    // requireSignIn,
    // isAdmin,
    deleteDeptController
  );
module.exports = router