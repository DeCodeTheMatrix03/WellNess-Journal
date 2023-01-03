import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
//pages
import LandingPage from './pages/LandingPage'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'

function App() {
  const {user} = useAuthContext()
  return (
   <div className ="container">
     <BrowserRouter>
      <Navbar />
        <div className = 'pages'>
          <Routes>
            <Route 
              path ="/"
              element={user ? <LandingPage /> : <Navigate to="/login" />}
            />
            <Route 
              path ="/login"
              element={!user ? <LogIn /> : <Navigate to="/"/>}
            />
            <Route 
              path ="/signup"
              element={!user ?  <SignUp /> : <Navigate to="/"/> }
            />
          </Routes>
        </div>
     </BrowserRouter>

   </div>
  );
}

export default App;
