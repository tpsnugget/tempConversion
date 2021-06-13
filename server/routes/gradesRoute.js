const studentModel = require('../models/studentModel')
const utils = require('../utils')

const express = require('express'),
  router = express.Router()

/* Route is /Grades */
router.post('/', async (req, res) => {

  let { student, studentAnswer, teacher, tempToConvert, unitToConvertFrom, unitToConvertTo } = req.body

  let correctAnswer = -Infinity
  let answerIs = ''

  /* studentAnswer and temptToConvert come over as strings,
     this converts them numbers or NaN which is falsey */
  studentAnswer = Number(studentAnswer)
  tempToConvert = Number(tempToConvert)

  /* Check to see if the temps are legal */
  const legalTempToConvert = utils.isTempLegal(tempToConvert, unitToConvertFrom)
  const legalStudentAnswer = utils.isTempLegal(studentAnswer, unitToConvertTo)

  if(legalTempToConvert){
    /* Calculate the correct answer */
    correctAnswer = utils.correctAnswer(req.body)
    utils.printTheCorrectAnswer(correctAnswer, unitToConvertTo)
  }

  /* Is the student already in the DB ? */
  let studentObj = await studentModel.findOne({student: student})

  /* The student is NOT in the DB */
  if(studentObj === null){
    studentObj = new studentModel
    studentObj.student = student
    studentObj.grades.push({teacher: teacher})

    /* Set teacher index for studentObj */
    const teacherIndex = 0

    /* Add Grade to studentObj */
    answerIs = utils.addGradeToObj(correctAnswer, req.body, studentObj, teacherIndex, legalStudentAnswer)
    answerIs = answerIs.answerIs
  
    try {
      const newGrade = await studentObj.save()
      res.status(200).json({newGrade, "correctAnswer": correctAnswer, "answerUnit": unitToConvertTo, "answerIs": answerIs})
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
    
    anwerIs = utils.addGradeToObj(correctAnswer, req.body, studentObj, teacherIndex, legalStudentAnswer)
    answerIs = answerIs.answerIs

    try {
        const newStudentObj = await studentModel.findByIdAndUpdate({_id: studentObj._id}, studentObj, {new: true, useFindAndModify: false})
        res.status(200).json({newStudentObj, "correctAnswer": correctAnswer, "answerUnit": unitToConvertTo, "answerIs": answerIs})
    } catch (error) {
      res.status(200).json({"msg": "error", error})
    }
  }
})

module.exports = router