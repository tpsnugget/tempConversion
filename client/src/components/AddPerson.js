/*
 * This Component is a child of <Landing />
 * It sends either a teacher or a student name to be added to the database
 */
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const AddPerson = ({getPerson}) => {

   const [ showSubmitButton, setShowSubmitButton ] = useState(false)
   const [ student, setStudent ] = useState('')
   const [ teacher, setTeacher ] = useState('')

   const handleSubmit = () => {
      getPerson({
         student,
         teacher
      })
      setStudent('')
      setTeacher('')
   }

   const handleStudentChange = (e) => {
      setStudent(e.target.value)
   }

   const handleTeacherChange = (e) => {
      setTeacher(e.target.value)
   }

   useEffect( () => {
      if(student.length > 0 || teacher.length > 0){
         setShowSubmitButton(true)
      }
   }, [student.length, teacher.length] )

   return (
      <Grid container style={{marginTop: '2rem'}}>
         <Grid item xs={3}>
            <TextField label='Add a Teacher (last, first)' variant='outlined' onChange={handleTeacherChange} style={{width: '100%'}} value={teacher} />
         </Grid>
         <Grid item xs={3}>
            <TextField label='Add a Student (last, first)' variant='outlined' onChange={handleStudentChange} style={{width: '100%', marginLeft: '0.5rem'}} value={student} />
         </Grid>
         <Grid item xs={1}>
            {showSubmitButton ?
               <Button color='primary' variant='contained' onClick={handleSubmit} style={{height: '100%', marginLeft: '0.5rem'}} >Submit</Button>
               :
               <Button color='primary' variant='contained' disabled style={{height: '100%', marginLeft: '0.5rem'}} >Submit</Button>
            }
         </Grid>
      </Grid>
   )
}

AddPerson.propTypes = {
   getPerson: PropTypes.func
}

export default AddPerson
