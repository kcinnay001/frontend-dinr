import React from 'react'
import HomeView from './HomeView'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faWindowClose, faUsers,faUserAlt } from '@fortawesome/free-solid-svg-icons'

const MainView = ({setIsAuth}) => {

    return (
        <div>
            <Navbar value={faBars} naviagtion='/feed' setIsAuth={setIsAuth}/>
            <HomeView/>
        </div>
    )
}

export default MainView
