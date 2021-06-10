let express = require('express'),
    app = express(),
    mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 3001

// For deployment
mongoose.connect(`${process.env.DB_HOST}${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-r2d5l.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })
 
 // Did we connect to the database, or did we get an error?
 const db = mongoose.connection
 
 db.on('error', console.error.bind(console, 'Error on db load'))
 db.once('open', () => {
   console.log('MongoDB is up Man!')
   
   // For local development ==================================================
   app.listen(PORT, () => {
   // ========================================================================
   console.log(`The Node Server is up on port ${PORT} ...`)
   })
 })

let grades = require('./routes/gradesRoute')
let student = require('./routes/studentRoute')
let teacher = require('./routes/teacherRoute')

/* These routes are not protected */
app.use('/Grades', grades)
app.use('/Student', student)
app.use('/Teacher', teacher)