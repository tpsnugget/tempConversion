import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const AddGrade = ({}) => {

   const [ student, setStudent ] = useState('')
   const [ teacher, setTeacher ] = useState('')

   return (
      <Grid container style={{marginTop: '2rem'}}>

         <Grid container>
            <Grid item xs={3}>
               <TextField label='Add a Teacher (last, first)' variant='outlined'  style={{width: '100%'}} value={teacher} />
            </Grid>
            <Grid item xs={3}>
               <TextField label='Add a Student (last, first)' variant='outlined'  style={{width: '100%', marginLeft: '0.5rem'}} value={student} />
            </Grid>
         </Grid>

         <Grid container style={{marginTop: '1rem'}}>
            <Grid item xs={3}>
               <TextField label='Add a Teacher (last, first)' variant='outlined'  style={{width: '100%'}} value={teacher} />
            </Grid>
            <Grid item xs={3}>
               <TextField label='Add a Student (last, first)' variant='outlined'  style={{width: '100%', marginLeft: '0.5rem'}} value={student} />
            </Grid>
            <Grid item xs={3}>
               <TextField label='Add a Student (last, first)' variant='outlined'  style={{width: '100%', marginLeft: '1rem'}} value={student} />
            </Grid>
            <Grid item xs={1}>
               {false ?
                  <Button color='primary' variant='contained'  style={{height: '100%', marginLeft: '1.5rem'}} >Submit</Button>
                  :
                  <Button color='primary' variant='contained' disabled style={{height: '100%', marginLeft: '1.5rem'}} >Submit</Button>
               }
            </Grid>
         </Grid>

         <Grid container style={{marginTop: '1rem'}}>
            <Grid item xs={3}>
               <TextField label='Add a Teacher (last, first)' variant='outlined'  style={{width: '100%'}} value={teacher} />
            </Grid>
            <Grid item xs={3}>
               <TextField label='Add a Student (last, first)' variant='outlined'  style={{width: '100%', marginLeft: '0.5rem'}} value={student} />
            </Grid>
         </Grid>

      </Grid>
   )
}

AddGrade.propTypes = {

}

export default AddGrade
