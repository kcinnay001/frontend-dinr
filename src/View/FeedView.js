import React from 'react'
import Navbar from './Navbar'
import './Styles/FeedView.css'
import notActive from '../View/Group.png'
import active from '../View/utensils-solid.png'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'


const FeedView = () => {
    return (
        <div>
            <Navbar value={faUserAlt} naviagtion='/'/>
            <div className='feed'>
                <div className='active'><img src={active}/></div>
                <div className='not_active'><img src={notActive}/></div>
            </div>
            <div className='feed_users'>
                <div className='feed_user_name'>
                    yannick loembet
                </div>
                <div className='feed_user_time'>
                    30min left
                </div>
            </div>
        </div>
    )
}

export default FeedView
