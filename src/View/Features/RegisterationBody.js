import React,{useState} from 'react'
import ExternalLogin from '../ExternalLogin'
import LoginBodyContent from '../LoginBodyContent'
import RegistrationBodyContent from '../RegistrationBodyContent'
import Linebreak from './Linebreak'
import RegisterationHeader from './RegisterationHeader'

const REGISTER_STYLE = {
    color:'rgb(0,0,0)',
    opacity:'0.24'
}


const RegisterationBody = ({setIsAuth}) => {

    const [isLogin,setIsLogin] = useState(true)
    const [isRegister,setIsRegister] = useState(Boolean)

    const buttonChange = (e) =>{
        if(e.target.outerText === 'register'){
            setIsRegister(true)
            setIsLogin(false)
        } else {
            setIsLogin(true)
            setIsRegister(false)
        }
    }

    return (
        <>
            <RegisterationHeader/>
            <div className='reg_body_container'>
                <div className='reg_body'>
                    <div className='reg_options'>
                    <div className='reg_register' style={isRegister? null : REGISTER_STYLE} onClick={(e)=>buttonChange(e)}> register</div>
                        <div className='reg_line'></div>
                        <div className='reg_login' style={isLogin? null : REGISTER_STYLE} onClick={(e)=>buttonChange(e)}>log in</div>
                    </div>
                    {isLogin && <LoginBodyContent setIsAuth={setIsAuth}/>}
                    {isRegister && <RegistrationBodyContent setIsAuth={setIsAuth}/>}                    
                    {/* <Linebreak/> */}
                    <ExternalLogin/>
                </div>
            </div>
        </>
    )
}

export default RegisterationBody
