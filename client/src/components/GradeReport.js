import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const GradeReport = ({grades}) => {

const report = grades.map( g => {
   return (
      <Grid key={g._id} container item justify='flex-start' style={{marginTop: '1rem'}}>
         <Grid item xs={2}>
            <Typography variant='h6'>
               {g.tempToConvert}
            </Typography>
         </Grid>
         <Grid item xs={2}>
            <Typography variant='h6'>
               {g.unitToConvertTo.toLocaleUpperCase()}
            </Typography>
         </Grid>
         <Grid item xs={2}>
            <Typography variant='h6'>
               {g.studentAnswer}
            </Typography>
         </Grid>
         <Grid item xs={2}>
            <Typography variant='h6'>
               {g.answerCategory}
            </Typography>
         </Grid>
      </Grid>
   )
} )

   return (
      <Grid container>
         {report}
      </Grid>
   )
}

GradeReport.propTypes = {
   grades: PropTypes.array
}

export default GradeReport
