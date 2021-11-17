import React,{useState} from 'react'
import '../Styles/Logbutton.css'
import '../Styles/Model.css'
import Modal from './Modal'
import TimerView from '../TimerView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop } from '@fortawesome/free-solid-svg-icons'

const TIME_SET_STYLE = {
    backgroundColor:'rgba(242,87,87,1)',
    color:'white'
}

const LogButton = () => {

    const [isOpen,setIsOpen] = useState(false)
    const [timeSet,setTimeSet] = useState(false)

    const stopTimer = () => {
        setIsOpen(false)
        setTimeSet(false)
    }

    return (
        <>
            <div className='logbutton'>
                <button style={timeSet?TIME_SET_STYLE:null}>
                    {timeSet?(
                        <div className='logbutton_started'>
                            {/* 
                                get the current time set subract time from the time it is on the world clock
                            */}
                            <p>00:00:00</p>
                            <div>
                                <FontAwesomeIcon onClick={stopTimer} icon={faStop}></FontAwesomeIcon>
                            </div>
                        </div>
                        ):(
                            <div onClick={()=>setIsOpen(true)}>
                                Log time
                            </div>
                            )}
                </button>
            </div>
            <Modal open={isOpen} onClose={()=> setIsOpen(false)} Component={TimerView} timeSet={()=> setTimeSet(true)}>
                set time
            </Modal>
        </>
    )
}

export default LogButton
