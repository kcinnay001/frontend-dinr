import './App.css';
import React, { useState,useEffect } from 'react';
import Axios from 'axios' // allows you to make http requests to the backend
import { BrowserRouter as Router,Link, Route,Switch } from 'react-router-dom'
import Crud from './Crud';
import LoginTest from './LoginTest';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import MainView from './View/MainView';
import FeedView from './View/FeedView';
import RegisterationBody from './View/Features/RegisterationBody';


function App() {
  const [isAuth, setIsAuth] = useState()

  useEffect(() => {
    console.log('first time', isAuth)
      Axios({
          method:'GET',
          withCredentials:true,
          url:'http://localhost:4000/user/login'
      }).then((res)=> {
        console.log(res.data.auth)
        if(res.data.auth !== undefined){
          setIsAuth(res.data.auth)
        } else {
          setIsAuth(false)
        }
       
      })   
   },[])
   console.log('first time', isAuth)



    return (
      <>
      {isAuth?(
        <Router>
          <Route path='/feed' component={FeedView}/>
          <Route path='/' exact>
            <MainView setIsAuth={setIsAuth}/>
          </Route>
        </Router> 
        )
        :
        (
          <Router>
            <Route path='/' component={RegisterationBody} exact/>
          </Router>
        )}
      </>
      // <Router>
      //   <Route path='/auth'>
      //       <button onClick={()=>{setIsAuth(true)}} >Login</button>
      //       <button onClick={()=>{setIsAuth(false)}} >Logout</button>
      //       <Link to='/profile'>profile</Link>
      //   </Route>
      //   <Route path='/' component={LoginTest}/>
      //   <ProtectedRoute path='/profile' component={Profile} isAuth={isAuth} />
      // </Router>
    );
}

export default App;
