import React from 'react'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import '../Styles/Model.css'


const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#FFF',
    zIndex:1000
}

const OVERLAY_STYLES = {
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000,
    overflow:'hidden'
}

const Modal = ({open,children, onClose,Component,timeSet,func}) => {

    if(!open) return null 

    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style={MODAL_STYLES} className='model'>
            <div className='model_header'>
                <div className='back_button'>
                    <button className='modal_header_button' onClick={onClose}> <FontAwesomeIcon icon={faChevronLeft} ></FontAwesomeIcon></button>
                </div>
                <div className='modal_title'>
                        {children}
                </div> 
            </div>
            <div className='modal_body'>
                {Component && (
                    <Component onClose={onClose} timeSet={timeSet}/>
                )}
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal
