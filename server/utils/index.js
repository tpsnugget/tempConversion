const studentModel = require('../models/studentModel')

const addGradeToObj = (rightAnswer, body, studentObj, teachIndex, studentAnswerIsLegal) => {

   let { studentAnswer, tempToConvert, unitToConvertFrom, unitToConvertTo } = body

   studentAnswer = Number(studentAnswer)

   let studentAnswerIsInteger = false
   let rightAnswerIsInteger = false

   /* Round the temps */
   if(studentAnswer - Math.trunc(studentAnswer) >= 0.5){
      studentAnswer = Math.ceil(studentAnswer)
   }
   else{
      studentAnswer = Math.floor(studentAnswer)
   }

   /* Deal with the fact that Number(0) is treated as a Boolean value instead of the number zero */
   if(Number.isInteger(studentAnswer)){
      studentAnswerIsInteger = true
   }
   if(Number.isInteger(rightAnswer)){
      rightAnswerIsInteger = true
   }

   let answerIs = ''

   if(studentAnswer === rightAnswer){
      answerIs = 'correct'
   
   }
   else if(!studentAnswerIsLegal){
      answerIs = 'invalid'
   }
   else {
      answerIs = 'incorrect'
   }

   /* IF studentAnswer AND tempToConvert are numbers */
   if(studentAnswerIsInteger && rightAnswerIsInteger){
      studentObj.grades[teachIndex].grade.push({
         tempToConvert,
         unitToConvertFrom,
         unitToConvertTo,
         studentAnswer,
         correctAnswer: rightAnswer,
         answerCategory: answerIs
         })
   }
   /* studentAnswer OR tempToConvert are NOT numbers */
   else{
      studentObj.grades[teachIndex].grade.push({
         tempToConvert,
         unitToConvertFrom,
         unitToConvertTo,
         studentAnswer,
         correctAnswer: rightAnswer,
         answerCategory: 'invalid'
         })
   }

   return {answerIs, studentObj}
}

const addTeacherToObj = (body, studentObj) => {
   const { teacher } = body
   studentObj.grades.push({teacher: teacher})
   return studentObj
}

const correctAnswer = (body) => {
   const { tempToConvert, unitToConvertFrom, unitToConvertTo } = body
   const temp = Number(tempToConvert)
   const unit = unitToConvertFrom + unitToConvertTo
   console.log('unit in switch statement is ', unit)
   let ans = -Infinity

   switch (unit) {
      case 'cf':
         ans = ( temp / 5 * 9 ) + 32
         break;
      case 'ck':
         ans = temp + 273.15
         break
      case 'cr':
         ans = ( ( temp / 5 * 9 ) + 32 ) + 459.67
         break
      case 'fc':
         ans = ( temp - 32 ) * ( 5 / 9 )
         break;
      case 'fk':
         ans = ( ( temp - 32 ) * ( 5 / 9 ) ) + 273.15
         break
      case 'fr':
         ans = ( temp + 459.67 )
         break
      case 'kc':
         ans = ( temp - 273.15 )
         break;
      case 'kf':
         ans = ( ( temp - 273.15 ) * ( 9 / 5 ) ) + 32
         break
      case 'kr':
         ans = ( 5 / 9 * temp )
         break
      case 'rc':
         ans = ( ( temp - 459.67 ) - 32 ) * ( 5 / 9 )
         break;
      case 'rf':
         ans = ( temp - 459.67 )
         break
      case 'rk':
         ans = ( 9 / 5 * temp )
         break
      default:
         break;
   }

   /* Round the temp */
   if(ans - Math.trunc(ans) >= 0.5){
      ans = Math.ceil(ans)
   }
   else{
      ans = Math.floor(ans)
   }

   return ans
}

const isTempLegal = (temp, unit) => {

   switch (unit) {
      case 'c':
         if(temp >= -273.15){ return true }
         break;
      case 'f':
         if(temp >= -460){ return true }
         break
      case 'k':
         if(temp >= 0){ return true }
         break
      case 'r':
         if(temp >= 0){ return true }
         break
      default:
         break;
   }
   console.log('That is not a legal temperature')
   return false
}

const printTheCorrectAnswer = (rightAnswer, unitToConvertTo) => {
   let unit = ''
   switch (unitToConvertTo) {
     case 'c':
       unit = ' C'
       break;
     case 'f':
       unit = ' F'
       break;
     case 'k':
       unit = ' K'
       break;
     case 'r':
       unit = ' R'
       break;
   
     default:
       break;
   }
   console.log('The correct answer is ', rightAnswer, unit)
}

const teacherIndex = (body, studentObj) => {
   const { teacher } = body
   /* Does the teacher already exist on the student object ? */
   return studentObj.grades.findIndex( t => t.teacher === teacher)
}

const utils = {

   addGradeToObj: addGradeToObj,

   addTeacherToObj: addTeacherToObj,

   correctAnswer: correctAnswer,

   isTempLegal: isTempLegal,

   printTheCorrectAnswer: printTheCorrectAnswer,

   teacherIndex: teacherIndex
}

module.exports = utils