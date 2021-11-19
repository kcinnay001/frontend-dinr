import React, { useEffect, useState } from 'react'
import Date from './Features/Date'
import Axios from 'axios' 
import './Styles/Home.css'
import LogButton from './Features/LogButton'
import PastLogs from './Features/PastLogs'

const HomeView = () => {  
    const [user,setUser] = useState('')

    useEffect(()=>{
        Axios({
            method:'GET',
            withCredentials:true,
            url:'http://localhost:4000/user/login'
        }).then((res)=>{
            setUser(res.data.username)
        })
    },[])

    return (
        <div className='Home'>
            <div className='profile-info'>
                {/* <div className='team'>Muira Team</div> */}
                <div className='name'>{user}</div>
                <Date/>
            </div>
                <LogButton/>
                <PastLogs/>
        </div>
    )
}

export default HomeView
