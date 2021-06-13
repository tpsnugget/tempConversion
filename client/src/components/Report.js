import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import GradeReport from './GradeReport'
import Grid from '@material-ui/core/Grid'
import { node_server } from '../helpers'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Report = ({student, teacher}) => {

   const [ data, setData ] = useState({})
   const [ grades, setGrades ] = useState([])
   const [ showFeedback, setShowFeedback ] = useState(false)
   const [ showReport, setShowReport ] = useState(false)

   const handleGetBoth = () => {
      axios.get(node_server + `/Grades/GetBoth/${student}/${teacher}`)
         .then( res => {
            console.log('Report /Grades/GetBoth res.data is ', res.data)
         } )
   }

   const handleGetStudent = () => {
      axios.get(node_server + `/Grades/GetStudent/${student}`)
         .then( res => {
            /* If the selected student has no grades this keeps the useEffect from attempting
               to access data.grades and data.student when data variable is null */
            if(res.data === null){
               setData({"data.grades": null, "data.student": null})
               setShowReport(false)
               setShowFeedback(true)
               setTimeout(() => {
                  setShowFeedback(false)
               }, 2500);
            }
            else{
               setData(res.data)
            }
            return res.data
         } )
         .then( d => {
            if(d !== null){
               setShowReport(true)
            }
            return null
         } )
   }
   const handleGetTeacher = () => {

   }

   useEffect( () => {
      if(data.student !== undefined){
         let gradesForReport = data.grades
         gradesForReport = gradesForReport.map( g => g.grade )
         gradesForReport = gradesForReport.flat()
         setGrades(gradesForReport)
      }
   }, [data.grades, data.student] )

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
