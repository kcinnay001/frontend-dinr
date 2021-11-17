import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router';
import './Styles/RegisterContent.css'

const RegistrationBodyContent = ({setIsAuth}) => {

    const history = useHistory()

    const [usernameReg,setUsernameReg] = useState('')
    const [passwordReg,setPasswordReg] = useState('')
    const [passwordConfirmReg,setConfirmPasswordReg] = useState('')
    const [emailReg,setEmailReg] = useState('')

    const register = () => {
     Axios({
            method:'POST',
            data:{
                username:usernameReg,
                email:emailReg,
                password:passwordReg
            },
            withCredentials: true,
            url:'http://localhost:4000/user/register'
        }).then((res)=>{
            console.log(res.data)
            window.location.reload()
        })
        
    }


    return (
        <form className='login_content_container'>
            <div className='form_box'>
                <div className='register_content_form'>
                    <input type='text' onChange={(e)=>{setUsernameReg(e.target.value)}} className='form_username' placeholder='username' value={usernameReg} />
                    <input type='email' onChange={(e)=>{setEmailReg(e.target.value)}} className='form_email' placeholder='email' value={emailReg}/>
                    <input type='password' onChange={(e)=>{setPasswordReg(e.target.value)}} className='form_password' placeholder='password' value={passwordReg}/>
                    <input type='password' onChange={(e)=>{setConfirmPasswordReg(e.target.value)}} className='form_confirm_password' placeholder='confirm password' value={passwordConfirmReg}/>
                    <button onClick={register}>Register</button>
                </div>
            </div>
        </form>
    )
}

export default RegistrationBodyContent
