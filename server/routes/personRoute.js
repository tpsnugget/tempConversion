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
        await newStudent.save()
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
        await newTeacher.save()
      }
    }
    const allPersons = await personModel.find({})
    const allStudents = allPersons.filter( s => s.personType === 'student' )
    const allTeachers = allPersons.filter( s => s.personType === 'teacher' )
    res.status(200).json({"students": allStudents, "teachers": allTeachers})

  } catch (error) {
      res.status(400).json({"msg": "Error in /Person/AddPerson", "err": error})
  }
})

/* Route is /Person/GetAllPersons */
router.get('/GetAllPersons', async (req, res) => {
  try {
    const allPersons = await personModel.find({})
    const allStudents = allPersons.filter( s => s.personType === 'student' )
    const allTeachers = allPersons.filter( s => s.personType === 'teacher' )
    res.status(200).json({"students": allStudents, "teachers": allTeachers})
  } catch (error) {
    res.status(400).json({"msg": "Error in /Person/GetAllPersons", "err": error})
  }
})

module.exports = router