const mongoose = require('mongoose')

/* Define the Student Schema */
const studentSchema = new mongoose.Schema({
    student: {
      type: String,
      required: true,
      unique: true
    },
    grades: [
       {
          teacher: String,
          grade: [
            {
               tempToConvert: String,
               unitToConvertFrom: String,
               unitToConvertTo: String,
               studentAnswer: String,
               correctAnswer: Number,
               answerCategory: String
            }
          ],
       },
    ]
})

module.exports = mongoose.model('student', studentSchema)