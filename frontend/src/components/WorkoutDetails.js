import React from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useAuthContext} from '../hooks/useAuthContext'


const WorkoutDetails = ({workout}) => {
  const {user} = useAuthContext()
  const {dispatch} = useWorkoutsContext()

  const handleClick = async() => {
    if(!user){
      return
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`

      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({
        type: 'DELETE_WORKOUT', payload: json
      })
    }
  }
  return (
    <div className = "workout-details">
        <h4><strong>{workout.title}</strong></h4>
        <p> <strong>Load: {workout.weight}lbs </strong></p>
        <p> <strong>Reps: {workout.reps} </strong></p>
        <p> <strong>Thoughts: <br></br>{workout.description} </strong></p>
        <p> {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>

        <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails