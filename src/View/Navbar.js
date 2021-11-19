import React,{ useState } from 'react'
import '../View/Styles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faWindowClose, faUsers,faUserAlt, faCookie } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Modal from './Features/Modal'
import GroupView from './GroupView'
import Axios from 'axios'
// import { CookiesProvider } from 'react-cookie';
// import { useCookies } from 'react-cookie';

const Navbar = ({value,naviagtion,setIsAuth}) => {

    const [isOpen,setIsOpen] = useState(false)

    const logOut = async() => {
        Axios({
            method:'GET',
            withCredentials:true,
            url:'http://localhost:4000/user/logout'
        })
       await window.location.reload();
    }

    return (
        <div className='Navbar'>
           <div className='Navbar-hamburger'>
                <Link to={naviagtion} style={{ textDecoration: 'none',  color:'rgba(22, 162, 152, 0.2)'}}>
                    {/* <FontAwesomeIcon icon={value}></FontAwesomeIcon> */}
                </Link>
            </div>
           <div className='Navbar-profile'>
               {/* <FontAwesomeIcon onClick={()=>setIsOpen(true)} icon={faUsers}></FontAwesomeIcon> */}
            </div>
           <div className='Navbar-logout'>
               <Link to='/' onClick={logOut} style={{ textDecoration: 'none',  color:'rgba(22, 162, 152, 0.2)'}}>
                    <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
               </Link>
           </div>
           <Modal open={isOpen} onClose={()=> setIsOpen(false)} Component={GroupView}>
                join group 
           </Modal>
        </div>
    )
}

export default Navbar
