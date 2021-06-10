const mongoose = require('mongoose')

/* Define the Teacher Schema */
const teacherSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
})

module.exports = mongoose.model('teacher', teacherSchema)