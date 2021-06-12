const studentModel = require('../models/studentModel')

const utils = {

   addGradeToObj: (body, studentObj, teacherIndex) => {
      const { studentAnswer, tempToConvert, unitToConvertFrom, unitToConvertTo } = body

      /* Ensure studentAnswer and / or tempToConvert are NOT numbers */
      if(!Number(studentAnswer) || !Number(tempToConvert)){
         studentObj.grades[teacherIndex].grade.push({
         tempToConvert,
         unitToConvertFrom,
         unitToConvertTo,
         studentAnswer,
         correctAnswer: 25,
         answerCategory: 'invalid'
         })
      }
      /* studentAnswer and tempToConvert are both numbers */
      else{
         studentObj.grades[teacherIndex].grade.push({
         tempToConvert,
         unitToConvertFrom,
         unitToConvertTo,
         studentAnswer,
         correctAnswer: 25,
         answerCategory: 'valid'
         })
      }

      return studentObj
   },

   addTeacherToObj: (body, studentObj) => {
      const { teacher } = body
      studentObj.grades.push({teacher: teacher})
      return studentObj
   },

   teacherIndex: (body, studentObj) => {
      const { teacher } = body
      /* Does the teacher already exist on the student object ? */
      return studentObj.grades.findIndex( t => t.teacher === teacher)
   }
}

module.exports = utils