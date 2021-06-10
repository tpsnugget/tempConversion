const mongoose = require('mongoose')

/* Define the Student Schema */
const studentSchema = new mongoose.Schema({
    teacher: {
      type: String,
      required: true,
    },
    grades: [
      {
         value: {
            type: Number,
            required: true
         },
         fromTemp: {
            type: String,
            required: true
         },
         toTemp: {
            type: String,
            required: true
         },
         correctAnswer: {
            value: Number,
            temp: String
         },
         answer: String
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('student', studentSchema)