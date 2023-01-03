//always require express
const express = require('express')
const {
    createWorkout,
    getSingleWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const protect = require('../middleware/protect')

//router 
const router = express.Router()

//first the user must be authenticated to get access to acess to any other routes
router.use(protect)

//fetch all workouts
router.get('/', getWorkouts)

//fetch single workout
router.get('/:id', getSingleWorkout)

//post one workout
router.post('/', createWorkout)

//delete one workout
router.delete('/:id', deleteWorkout)

//update a workout
router.put('/:id',  updateWorkout
)

//export module
module.exports = router