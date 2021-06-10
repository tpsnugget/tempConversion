const mongoose = require('mongoose')

/* Define the Person Schema */
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    personType: {
      type: String,
      required: true,
      default: 'student'
    }
})

module.exports = mongoose.model('person', personSchema)