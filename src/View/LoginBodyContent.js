import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Styles/LoginContent.css'
import Axios from 'axios';


const LoginBodyContent = () => {


const [loginEmail,setLoginEmail] = useState('')
const [loginPassword,setLoginPassword] = useState('')

const login = () => {
    Axios({
        method:'POST',
        data:{
            email: loginEmail,
            password:loginPassword
        },
        withCredentials:true,
        url:'http://localhost:4000/user/login'
    }).then((res)=> {
        console.log(res)
        window.location.reload()
    })
}

    return (
        
        <div className='login_content_container'>
            <div className='form_box'>
                <div className='login_content_form'>
                    <input type='email' className='form_email' placeholder='email' onChange={e => setLoginEmail(e.target.value)}/>
                    <input type='password' className='form_password' placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
                    <button onClick={login}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default LoginBodyContent
