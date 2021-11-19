import React,{ useEffect, useState } from 'react'
import {ms,s,m,h,d} from 'time-convert'
import './Styles/Model.css'
import Axios from 'axios' 

const TimerView = ({onClose, timeSet}) => {
    let newTime = new Date()

    // States 
    const [seconds,setSeconds] = useState('00')
    const [minutes,setMinutes] = useState('00')
    const [hours,setHours] = useState('00')
    const [userId,setUserId] = useState(0)
    const [ndate,setNDate] = useState('')
    const [duration,setDuration] = useState(0)
    const [finalTime,setFinalTime] = useState(0)
    const [status,setStatus] = useState()
    const [currentTimes,setCurrentTimes] = useState()

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

    const setTime = () => { 
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        // console.log(hours,minutes,seconds)
        // console.log(cHours,cMinutes,cSeconds)

        const totalTimeInMinutes = (parseFloat(hours) * 60) + parseFloat(minutes) + (parseFloat(seconds) /60)
        const totalCurrentTimeInMinutes = (cHours * 60) + cMinutes + (cSeconds/60)
        // console.log('total time minutes:',totalTimeInMinutes)
        // console.log('total current time minutes:',totalCurrentTimeInMinutes)
        // console.log('finishing time', totalCurrentTimeInMinutes + totalTimeInMinutes)

        const ftime = totalCurrentTimeInMinutes + totalTimeInMinutes

            if(totalTimeInMinutes> 0){
                // console.log('api request')
                Axios({
                    method:'PUT',
                    data:{
                        id:userId,
                        date:date+'/'+month+'/'+year,
                        duration:totalTimeInMinutes.toString(),
                        finalTime:ftime.toString(),
                        status:true
                    },
                    withCredentials:true,
                    url:'http://localhost:4000/time/set'
                }).then((result)=>{
                    onClose()
                    timeSet()
                    window.location.reload()
                })
            }     
        }

        const getUser = () => {
            Axios({
                method:'GET',
                withCredentials:true,
                url:'http://localhost:4000/user/login'
            }).then((res)=> {
                setUserId(res.data._id)
                Axios({
                    method:'GET',
                    withCredentials:true,
                    url:'http://localhost:4000/time/'+res.data._id
                }).then((times)=>{
                // console.log(times)
                    setCurrentTimes(times)
                })
            }) 
    }
    // console.log(currentTimes)
    useEffect(()=>{
        getUser()
        CheckNumber()
        // totalTime()

    
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
