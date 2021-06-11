import React, { useEffect, useState } from 'react'
import AddGrade from '../components/AddGrade'
import AddPerson from '../components/AddPerson'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/container'
import Grid from '@material-ui/core/Grid'
import { node_server } from '../helpers'
import Report from '../components/Report'
import Typography from '@material-ui/core/Typography'

const Landing = () => {

   const [ student, setStudent ] = useState('')
   const [ teacher, setTeacher ] = useState('')

   const getPerson = (person) => {
      if(person.student !== undefined){ setStudent(person.student) }
      if(person.teacher !== undefined){ setTeacher(person.teacher) }
   }

   /* Add Student and / or Teacher to the database if they do not already exist */
   useEffect( () => {
      if(student.length > 0 || teacher.length > 0){
         axios.post(node_server + '/Person/AddPerson', {student, teacher})
         .then( res => {
            console.log('Landing /Person/AddPerson res.data is ', res.data)
         })
      }
   }, [student, teacher] )

   return (
      <Box>
         <Container>
            <Grid container justify='center' style={{marginTop: '2rem'}}>
               <Typography variant='h4'>Temperature Conversion Data Entry</Typography>
            </Grid>

            <AddPerson getPerson={getPerson}/>

            <AddGrade />

            <Report />

         </Container>
      </Box>
   )
}

export default Landing
