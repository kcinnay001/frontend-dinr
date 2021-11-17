import React,{ useEffect, useState } from 'react'
import {ms,s,m,h,d} from 'time-convert'
import './Styles/Model.css'

const TimerView = ({onClose, timeSet}) => {
    let newTime = new Date()

    // States 
    const [seconds,setSeconds] = useState(0)
    const [minutes,setMinutes] = useState(0)
    const [hours,setHours] = useState(0)

    // variables 
    
    let cHours = newTime.getHours();
    let cMinutes = newTime.getMinutes()
    let cSeconds = newTime.getSeconds()

    // Functions

    // func: to check whether the number entered dosent exceed to numbers
    const CheckNumber = () => {
        if(seconds>59 || seconds.toString().split().length > 2){
            setSeconds('')
        }
        if(minutes>59 || minutes.toString().split().length > 2){
            setMinutes('')
        }
        if(hours>1 || hours.toString().split().length > 2){
            setHours('')
        }
    }

    // check to time 
    const totalTime = () => {
        // workout difference in current time a chosen time 

        let totalTime = parseFloat(hours*3600) + parseFloat(seconds) + parseFloat(minutes*60);
        let totalCurrentTime = cHours*60 + cMinutes + 60/cSeconds;
        //let finalTime = 1215.6666666666667

        let toHours = parseFloat((totalTime/3600).toString().split('.')[0])
        let toMinutes = parseFloat((('0.' +(totalTime/3600).toString().split('.')[1])*60).toString().split('.')[0])
        let toSeconds = parseInt(seconds)

        
        console.log('final time:',totalCurrentTime+((totalTime/3600)*60))
        console.log('current time:',totalCurrentTime)

        console.log('chosen time in seconds:',totalTime)
        console.log('chosen time in minutes:',(totalTime/3600)*60)
        console.log('timeleft:', totalCurrentTime+((totalTime/3600)*60) - totalCurrentTime)
        // set to local storage
    }

    const setTime = () => {
        onClose()
        timeSet()
        

    // when time is set update the time in the database for the user
    }

    useEffect(()=>{
        CheckNumber()
        totalTime()

    
    },[seconds,hours,minutes])

    return (
        <>
            <div className='modal_timer'>
                <div className='modal_content'>
                    <input type="number" onChange={(e)=>setHours(e.target.value)} value={ hours} />: 
                    <input type="number" onChange={(e)=>setMinutes(e.target.value)} value={minutes} />: 
                    <input type="number" onChange={(e)=>setSeconds(e.target.value)} value={seconds} /> 
                </div>
                <div className='modal_button'>
                    <button onClick={setTime}>
                        Set
                    </button>       
                </div>
            </div>
        </>
    )
}

export default TimerView
