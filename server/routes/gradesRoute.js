const studentModel = require('../models/studentModel')
const utils = require('../utils')

const express = require('express'),
  router = express.Router()

/* Route is /Grades */
router.post('/', async (req, res) => {

  const { student, studentAnswer, teacher, tempToConvert, unitToConvertFrom, unitToConvertTo } = req.body

  /* Is the student already in the DB ? */
  let studentObj = await studentModel.findOne({student: student})

  /* The student is NOT in the DB */
  if(studentObj === null){
    studentObj = new studentModel
    studentObj.student = student
    studentObj.grades.push({teacher: teacher})

    /* Get teacher index from studentObj */
    const teacherIndex = utils.teacherIndex(req.body, studentObj)

    /* Add Grade to studentObj */
    utils.addGradeToObj(req.body, studentObj, teacherIndex)
  
    try {
      const newGrade = await studentObj.save()
      res.status(200).json(newGrade)
    } catch (error) {
      res.status(200).json(error)
    }
  }
  /* The student IS in the DB */
  else{
    /* If the teacher is NOT in the studentObj */
    if(utils.teacherIndex(req.body, studentObj) === -1){
      utils.addTeacherToObj(req.body, studentObj)
    }

    /* Get teacher index from studentObj */
    const teacherIndex = utils.teacherIndex(req.body, studentObj)
    
    utils.addGradeToObj(req.body, studentObj, teacherIndex)

    try {
        const newStudentObj = await studentModel.findByIdAndUpdate({_id: studentObj._id}, studentObj, {new: true})
        res.status(200).json(newStudentObj)
    } catch (error) {
      res.status(200).json({"msg": "error", error})
    }
  }
})

module.exports = router