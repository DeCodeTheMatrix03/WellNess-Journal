import React from 'react'
import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
//goes to our API and submits a POST request
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return
        }

        const workout = {title,weight,reps,description}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
    const json = await response.json()

    //checking response
    if(!response.ok){
        setError(json.error)
    }
    //using the dispatch function to re-render the home components
    if(response.ok){
        setTitle('')
        setReps('')
        setWeight('')
        setDescription('')
        setError(null)
        console.log('New Workout Added', json)
        dispatch({type:'CREATE_WORKOUT' , payload: json})
    }
    }
  return (
    <form 
    className ="create"
    onSubmit={handleSubmit}>
        <h3>Add A New Workout</h3>
        <label>Exercise Name: </label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            name={title.name}
            value={title}
            placeholder='Enter Exercise Name'/>
         <label>Load (in lbs): </label>
            <input 
            type="number"
            onChange={(e) => setWeight(e.target.value)}
            name={weight.name}
            value={weight}
            placeholder='Enter Load'/>
            
        <label># of Reps: </label>
            <input 
            type="number"
            onChange={(e) => setReps(e.target.value)}
            name={reps.name}
            value={reps}
            placeholder='Enter Rep Number'/>
        <label>Description: </label>
            <input 
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            name={description.name}
            value={description}
            placeholder='How did you feel completing this exercise?'/>
          <button>Add Workout</button>
          {error && <div className ="error"> Please Fill Out The Entire Form </div>}
    </form>
  )
}

export default WorkoutForm