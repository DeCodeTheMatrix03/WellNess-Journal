import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const { dispatch: workoutDispatch} = useWorkoutsContext()

    //logout
    const logout = () => {
    localStorage.removeItem('user')

    //dispatch logout
    dispatch({type: 'LOGOUT'})
    workoutDispatch({type: 'SET_WORKOUTS', payload: null})
  }

  return {logout}
}
