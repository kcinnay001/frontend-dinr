import React, { useState,useEffect } from 'react'
import Axios from 'axios';
const Login = () => {

    const [usernameReg,setUsernameReg] = useState('')
    const [passwordReg,setPasswordReg] = useState('')

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [loginStatus,setLoginStatus] = useState(Boolean)

    Axios.defaults.withCredentials = true
    const register = () => {
        Axios.post('http://localhost:4000/test/register', {
            username: usernameReg,
            password:passwordReg
        }).then((res)=>{
            console.log(res)
        })
    } 

    const login = () => {
        Axios.post('http://localhost:4000/test/login', {
            username: username,
            password:password
        }).then((res)=>{
            console.log(res)
            if(!res.data.auth){
                setLoginStatus(false)
            } else {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setLoginStatus(true)
            }
           // console.log(res.data)
        })
    }

    const userAuthenicated = () => {
        Axios.get('http://localhost:4000/test/isUserAuth',{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res)
        })
    }

    // useEffect(() => {
    //     Axios.get('http://localhost:4000/test/login').then((res)=>{
    //         if(res.data.loggedIn == true){
    //             console.log(res)
    //             setLoginStatus(true)
    //         }
    //     })
    // }, [])

    return (
        <div className='App'>
            <div className='registeation'>
                <h1>Registration</h1>
                <label>Username</label>
                <input type='text' onChange={(e)=>setUsernameReg(e.target.value)}/>
                <label>Password</label>
                <input type='text' onChange={(e)=>setPasswordReg(e.target.value)}/>
                <button onClick={register}>Register</button>
            </div>
            <div className='login'>
                <h1>Login</h1>
                <input type='text' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
                <input type='password' placeholder='password...'onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={login}>Login</button>
            </div>
            {loginStatus && (
                <button onClick={userAuthenicated}>Check if authenticated</button>
            )}
        </div>
    )
}

export default Login
