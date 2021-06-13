import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import GradeReport from './GradeReport'
import Grid from '@material-ui/core/Grid'
import { node_server } from '../helpers'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Report = ({student, teacher}) => {

   const [ grades, setGrades ] = useState([])
   const [ showFeedback, setShowFeedback ] = useState(false)
   const [ showReport, setShowReport ] = useState(false)

   /* Called once by each handleGet function that calls the DB */
   const handleData = (res) => {
      /* IF {getGrades: Array(9)} was returned */
      if(res.data.getStudent !== null){
         setGrades(res.data.getStudent)
         setShowReport(true)
      }
      /* IF {getGrades: null} was returned */
      else{
         setShowReport(false)
         setShowFeedback(true)
         setTimeout(() => {
            setShowFeedback(false)
         }, 2500);
      }
   }

   const handleGetBoth = () => {
      axios.get(node_server + `/Grades/GetBoth/${student}/${teacher}`)
      .then( res => {
         handleData(res)
         } )
   }

   const handleGetStudent = () => {
      axios.get(node_server + `/Grades/GetStudent/${student}`)
         .then( res => {
            handleData(res)
         } )
   }

   const handleGetTeacher = () => {
      axios.get(node_server + `/Grades/GetTeacher/${teacher}`)
         .then( res => {
            handleData(res)
         } )
   }

   return (
      <Grid container>

         <Grid container item justify='center' style={{marginTop: '1rem'}}>
            <Typography variant='h4'>
               Reports
            </Typography>
         </Grid>
         
         <Grid container item justify='space-around' style={{marginTop: '1rem'}}>

            {student !== '' ?
               <Grid>
                  <Button color='primary' variant='contained' onClick={handleGetStudent} >
                     Selected Student
                  </Button>
               </Grid>
               :
               <Grid>
                  <Button color='primary' variant='contained' disabled >
                     Selected Student
                  </Button>
               </Grid>
            }

            {teacher !== '' ?
               <Grid>
                  <Button color='primary' variant='contained' style={{marginLeft: '0.5rem'}} onClick={handleGetTeacher} >
                     Selected Teacher
                  </Button>
               </Grid>
               :
               <Grid>
                  <Button color='primary' variant='contained' style={{marginLeft: '0.5rem'}} disabled >
                     Selected Teacher
                  </Button>
               </Grid>
            }

            {student !== '' && teacher !== '' ?
               <Grid>
                  <Button color='primary' variant='contained' style={{marginLeft: '0.5rem'}} onClick={handleGetBoth} >
                     Selected Student / Teacher
                  </Button>
               </Grid>
               :
               <Grid>
                  <Button color='primary' variant='contained' style={{marginLeft: '0.5rem'}} disabled >
                     Selected Student / Teacher
                  </Button>
               </Grid>
            }

         </Grid>

         {showReport ?
            <Grid container item justify='flex-start' style={{marginTop: '1rem'}}>
               <Grid item xs={2}>
                  <Typography variant='h6'>
                     Input Temp
                  </Typography>
               </Grid>
               <Grid item xs={2}>
                  <Typography variant='h6'>
                     Target Units
                  </Typography>
               </Grid>
               <Grid item xs={2}>
                  <Typography variant='h6'>
                     Student Response
                  </Typography>
               </Grid>
               <Grid item xs={2}>
                  <Typography variant='h6'>
                     Grade
                  </Typography>
               </Grid>
            </Grid>
            : null
         }

         {showReport ?
            <GradeReport grades={grades} />
            : null
         }

         {showFeedback ?
            <Grid container justify='center' style={{marginTop: '3rem'}} >
               <Typography variant='h4'>
                  There is no data for your selection(s)
               </Typography>
            </Grid>
            : null
         }

      </Grid>
   )
}

Report.propTypes = {
   student: PropTypes.string,
   teacher: PropTypes.string
}

export default Report
