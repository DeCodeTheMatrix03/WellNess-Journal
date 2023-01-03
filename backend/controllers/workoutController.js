const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req,res) => {
    const user_id = req.user._id
    //get all the workouts and sort them from newest to oldest
    const workouts = await Workout.find({ user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get single workout
const getSingleWorkout = async (req,res) => {
    //garb  the ID from the request
    const { id } = req.params 

//checking for ID type
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'No workout found'})
    }
    res.status(200).json(workout)
}
//post single workout

const createWorkout = async (req,res) => {
    const{title, reps, weight, description} = req.body
//adding doc to database
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, reps, weight, description, user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete single workout

const deleteWorkout = async ( req,res) => {
    //grabbing id of that request
    const {id} = req.params
    //checking if ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    //going through our DB and finding the document that matches our id property
    const workout = await Workout.findByIdAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'No workout found'})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async ( req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    //going to the DB and updating the document with the matching ID and changing the properties in req.body
    const workout = await Workout.findByIdAndUpdate(
        {_id : id}, 
        {...req.body})

    if(!workout){
        return res.status(404).json({error: 'No workout found'})
    }
    res.status(200).json(workout)
}


//export

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}