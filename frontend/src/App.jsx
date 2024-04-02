import React from 'react'
import"./index.css"
import { Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import UserPage from './UserPage';
import Sign from './Sign';
import Home from './Home';
import MyProfile from './MyProfile';
import CreateTeam from './CreateTeam';
import MyTeam from './MyTeam';
import Edit from './Edit';


function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' Component={Home} ></Route>
      <Route exact path='/signup' Component={SignUp} ></Route>
      <Route exact path='/login' Component={Sign} ></Route>
      <Route exact path='/postlist' Component={UserPage}/>
      <Route exact path='/myprofile' Component={MyProfile}/>
      <Route exact path='/createteam' Component={CreateTeam}/>
      <Route exact path='/myteam' Component={MyTeam}/>
      <Route exact path='/edit' Component={Edit}/>
    </Routes>
   {/* <Sign/> */}
    </>
  )
}

export default App
