import React from 'react'
import Date from './Features/Date'
import './Styles/Home.css'
import LogButton from './Features/LogButton'
import PastLogs from './Features/PastLogs'

const HomeView = () => {  
    return (
        <div className='Home'>
            <div className='profile-info'>
                <div className='team'>Muira Team</div>
                <div className='name'>yannick loembet</div>
                <Date/>
            </div>
                <LogButton/>
                <PastLogs/>
        </div>
    )
}

export default HomeView
