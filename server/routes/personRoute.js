const personModel = require('../models/personModel')

const express = require('express'),
  router = express.Router()

/* Route is /Person/AddPerson */
router.post('/AddPerson', async (req, res) => {
  try {
    const { student, teacher } = req.body

    let addedStudent = {}
    let addedTeacher = {}

    /* Student is defined */
    if(student !== ''){
      const studentExists = await personModel.find({"name": student})

      /* That student name is not in the database */
      if(studentExists.length === 0){
        const newStudent = new personModel
        newStudent.name = student
        addedStudent = await newStudent.save()
      }
    }

    /* Teacher is defined */
    if(teacher !== ''){
      const teacherExists = await personModel.find({"name": teacher})

      /* That teacher name is not in the database */
      if(teacherExists.length === 0){
        const newTeacher = new personModel
        newTeacher.name = teacher
        newTeacher.personType = 'teacher'
        addedTeacher = await newTeacher.save()
      }
      /* That teacher name does exist in the database */
      else{
        addedTeacher = "Teacher exists"
      }
    }

    res.status(200).json({"student": addedStudent, "teacher": addedTeacher})

  } catch (error) {
      res.status(200).json({"msg": "Error", "err": error})
  }
})

module.exports = router