import React from 'react'
import {useState} from 'react'
import { useLogIn } from '../hooks/useLogIn'

const LogIn = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const {login, error, isLoading} = useLogIn()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await login(email,password)
    }

  return (
 
    <form className="login" onSubmit={handleSubmit}>
      <div className=" logInText"> 
        <h3>Log In</h3>
      </div>
  
      <input
      type="email"
      placeholder='Email'
      onChange={(e) => setEmail(e.target.value)}
      value = {email}
      />
      <input
      type="password"
      placeholder='Password'
      onChange={(e) => setPassword(e.target.value)}
      value = {password}
      />
       <p>Not a member yet? <a href='/signup'>Sign Up</a></p>
    <button disabled={isLoading}>Log In</button>
    {error && <div className="error"> {error}</div>}
</form>

  )
}

export default LogIn