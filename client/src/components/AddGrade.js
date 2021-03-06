import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { node_server } from '../helpers'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const AddGrade = ({allStudents, allTeachers, getStudent, getTeacher}) => {

   const [ answerIs, setAnswerIs ] = useState('')
   const [ answerUnit, setAnswerUnit ] = useState('')
   const [ correctAnswer, setCorrectanswer ] = useState('')
   const [ showSubmitButton, setShowSubmitButton ] = useState(false)
   const [ student, setStudent ] = useState('')
   const [ studentAnswer, setStudentAnswer ] = useState('')
   const [ teacher, setTeacher ] = useState('')
   const [ tempToConvert, setTempToConvert ] = useState('')
   const [ unitToConvertFrom, setUnitToConvertFrom ] = useState('')
   const [ unitToConvertTo, setUnitToConvertTo ] = useState('')

   const dropdownStudents = allStudents.map( s => {
      return (
         <MenuItem key={s._id} value={s.name}>{s.name}</MenuItem>
      )
   } )

   const dropdownTeachers = allTeachers.map( t => {
      return (
         <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
      )
   } )

   const handleStudentAnswerChange = (e) => {
      setStudentAnswer(e.target.value)
   }

   const handleTempToConvertChange = (e) => {
      setTempToConvert(e.target.value)
   }

   const handleStudentSelect = (e) => {
      setStudent(e.target.value)
      getStudent(e.target.value)
   }

   const handleSubmit = () => {

      const submission = {
         student,
         studentAnswer,
         teacher,
         tempToConvert,
         unitToConvertFrom,
         unitToConvertTo
      }

      axios.post(node_server + '/Grades', submission)
         .then( res => {
            setAnswerIs(res.data.answerIs)
            setAnswerUnit(res.data.answerUnit)
            setCorrectanswer(res.data.correctAnswer)
         } )
      setTempToConvert('')
      setUnitToConvertFrom('')
      setUnitToConvertTo('')
      setStudentAnswer('')
   }

   const handleTeacherSelect = (e) => {
      setTeacher(e.target.value)
      getTeacher(e.target.value)
   }

   const handleUnitToConvertFromSelect = (e) => {
      setUnitToConvertFrom(e.target.value)
   }

   const handleUnitToConvertToSelect = (e) => {
      setUnitToConvertTo(e.target.value)
   }

   useEffect( () => {
      if(
         student.length > 0 &&
         teacher.length > 0 &&
         tempToConvert.length > 0 &&
         unitToConvertFrom.length > 0
         && unitToConvertTo.length > 0 &&
         studentAnswer.length > 0
         ){
         setShowSubmitButton(true)
      }
   }, [student, teacher, tempToConvert.length, unitToConvertFrom.length, unitToConvertTo.length, studentAnswer.length] )

   return (
      <Grid container style={{marginTop: '2rem'}}>

         <Grid container>
            <Grid item xs={3}>
               <FormControl style={{width: '100%'}}>
                  <InputLabel style={{paddingLeft: '1rem'}}>Select a Teacher</InputLabel>
                  <Select variant='outlined' value={teacher} onChange={handleTeacherSelect}>
                     <MenuItem value=''><em>None</em></MenuItem>
                     {dropdownTeachers}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={3}>
               <FormControl style={{width: '100%', marginLeft: '0.5rem'}}>
                  <InputLabel style={{paddingLeft: '1rem'}}>Select a Student</InputLabel>
                  <Select variant='outlined' value={student} onChange={handleStudentSelect}>
                     <MenuItem value=''><em>None</em></MenuItem>
                     {dropdownStudents}
                  </Select>
               </FormControl>
            </Grid>
         </Grid>

         <Grid container style={{marginTop: '1rem'}}>
            <Grid item xs={3}>
               <TextField label='Enter Temperature to convert' variant='outlined'  style={{width: '100%'}} value={tempToConvert} onChange={handleTempToConvertChange} />
            </Grid>
            <Grid item xs={2}>
               <FormControl style={{width: '100%', marginLeft: '0.5rem'}}>
                  <InputLabel style={{paddingLeft: '1rem'}}>Unit to Convert FROM</InputLabel>
                  <Select variant='outlined' value={unitToConvertFrom} onChange={handleUnitToConvertFromSelect}>
                     <MenuItem value=''><em>None</em></MenuItem>
                     {unitToConvertTo === 'c' ? null : <MenuItem value='c'>Celcius</MenuItem>}
                     {unitToConvertTo === 'f' ? null : <MenuItem value='f'>Fahrenheit</MenuItem>}
                     {unitToConvertTo === 'k' ? null : <MenuItem value='k'>Kelvin</MenuItem>}
                     {unitToConvertTo === 'r' ? null : <MenuItem value='r'>Rankine</MenuItem>}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={2}>
               <FormControl style={{width: '100%', marginLeft: '1rem'}}>
                  <InputLabel style={{paddingLeft: '1rem'}}>Unit to Convert TO</InputLabel>
                  <Select variant='outlined' value={unitToConvertTo} onChange={handleUnitToConvertToSelect}>
                     <MenuItem value=''><em>None</em></MenuItem>
                     {unitToConvertFrom === 'c' ? null : <MenuItem value='c'>Celcius</MenuItem>}
                     {unitToConvertFrom === 'f' ? null : <MenuItem value='f'>Fahrenheit</MenuItem>}
                     {unitToConvertFrom === 'k' ? null : <MenuItem value='k'>Kelvin</MenuItem>}
                     {unitToConvertFrom === 'r' ? null : <MenuItem value='r'>Rankine</MenuItem>}
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={2}>
               <TextField label='Enter Answer' variant='outlined'  style={{width: '100%', marginLeft: '1.5rem'}} value={studentAnswer} onChange={handleStudentAnswerChange} />
            </Grid>
            <Grid item xs={1}>
               {showSubmitButton ?
                  <Button color='primary' variant='contained'  style={{height: '100%', marginLeft: '2rem'}} onClick={handleSubmit} >Submit</Button>
                  :
                  <Button color='primary' variant='contained' disabled style={{height: '100%', marginLeft: '2rem'}} >Submit</Button>
               }
            </Grid>
         </Grid>

         <Grid container style={{marginTop: '1.5rem'}}>
            <Grid container item xs={3} justify='flex-start'>
               <Typography variant='h6' >
                  The correct value is: {correctAnswer} {answerUnit.toLocaleUpperCase()}
               </Typography>
            </Grid>
            <Grid container item xs={3} justify='flex-start' style={{marginLeft: '0.5rem'}}>
               <Typography variant='h6'>
                  The answer is: {answerIs}
               </Typography>
            </Grid>
         </Grid>

      </Grid>
   )
}

AddGrade.propTypes = {
   allStudents: PropTypes.array,
   allTeachers: PropTypes.array,
   getStudent: PropTypes.func,
   getTeacher: PropTypes.func
}

export default AddGrade
