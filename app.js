const express = require('express');
const mongoose=require("mongoose")
const app=express()
app.use("/files",express.static("files"))
require('dotenv').config() 
require('./db');
const Pdf=require('./models/pdf')
const pdfSchema=mongoose.model('Pdf_s')
const authRoute=(require('./routes/authRoute'))
const departmentRoutes =require('./routes/department')
const courseRoutes =require('./routes/course')
const facultyRoutes =require('./routes/faculty_stu')
const path =require('path')
const formidable = require("express-formidable");
// app.use(formidable());
app.use("/auth",authRoute)
app.use("/department",departmentRoutes)
app.use("/course",courseRoutes)
app.use("/faculty",facultyRoutes)
app.use(express.json())
const cors=require('cors')
app.use(cors());
const {objectIdcontroller} = require('./controllers/courseController')
const {objectIdcontroller_f} = require('./controllers/facultyController')
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
  })


app.post('/rec',objectIdcontroller);
app.post('/dept-id',objectIdcontroller_f);
  app.listen(5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });



