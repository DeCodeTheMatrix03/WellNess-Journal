import React from 'react'
import {useState} from 'react'
import {useSignUp} from '../hooks/useSignUp'

const SignUp = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const {signup, error, isLoading} = useSignUp()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await signup(email,password)

    }

  return (
    <form
    className="signup" 
    onSubmit={handleSubmit}>
      <div className="signUpText"> 
        <h3>Sign Up</h3>
      </div>
        <input
        type="email"
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value = {email}
        />
        <input
        type="email"
        placeholder='Confirm Email'
        />
        <input
        type="password"
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value = {password}
        />
        <input
        type="password"
        placeholder='Confirm Password'
        />
       
       <p>Already a member? <a href='/login'>Log In</a></p>
<button disabled={isLoading}>Sign Up</button>
{error && <div className="error"> {error}</div>}
    </form>
  )
}

export default SignUp