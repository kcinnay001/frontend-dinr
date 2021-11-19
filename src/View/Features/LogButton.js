import React,{useState,useEffect} from 'react'
import Axios from 'axios' 
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
    const [userId,setUserId] = useState(0)
    const [timeId,setTimeId] = useState()
    const [currentTime,setCurrentTime] = useState()
    const [remainTime,setRemainTime] = useState()
    const [ongoingtime, setOnGoingTime] = useState();
    const [timeleft, setTimeLeft] = useState(currentTime);

    let newTime = new Date()

    let cHours = newTime.getHours();
    let cMinutes = newTime.getMinutes()
    let cSeconds = newTime.getSeconds()
    // console.log(cHours,cMinutes,cSeconds)

   

    const stopTimer = () => {
        
        Axios({
            method:'PUT',
            withCredentials:true,
            url:'http://localhost:4000/time/usertime/'+userId+'/'+ timeId
        }).then((res)=>{
            // console.log(res)
            setIsOpen(false)
            setTimeSet(false)
            window.location.reload()
        })

       
    }

    const startTimer = () => {
        setTimeSet(true)
        getUserTime()
    }

    const timeConvert = (min) =>{
        // console.log('final time in minutes', min)
        var num = parseFloat(min)
        var hour;
        var minutes;
        var seconds;

        hour = (num/60).toString().split('.')[0]
        minutes = (('0.'+(num/60).toString().split('.')[1]) *60).toString().split('.')[0]
        seconds = (('0.'+(('0.'+(num/60).toString().split('.')[1]) *60).toString().split('.')[1])*60).toString().split('.')[0]
        
        seconds = seconds>=10 ? seconds: '0'+ seconds
        minutes = minutes>=10 ? minutes: '0'+ minutes
        hour    = hour>=10 ? hour: '0'+hour

        // console.log(hour+':'+minutes+':'+seconds)
        return hour+':'+minutes+':'+seconds
    }

    const timeDifference = (timeInMinutes,currentTimeInMinutes) => {
        // console.log('final',timeInMinutes)
        // console.log('current',currentTimeInMinutes)
        const remainTime = parseFloat(timeInMinutes) - parseFloat(currentTimeInMinutes);
        // console.log(remainTime)
        return remainTime;

    }

    const getUserTime = () => {
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
                if(times.data.length > 0){
                        for(var i in times.data){
                            if(times.data[i].status){
                                setTimeId(times.data[i]._id)
                                setTimeSet(true)
                            
                                let c = times.data[i].finalTime                
                                let t = cHours *60 + cMinutes + cSeconds/60;
                                let f = timeDifference(c,t)
                        
                                setCurrentTime(f)
                
                                let diff = timeConvert(f)
                                setRemainTime(diff)
                
                            } else {
                                setTimeSet(false)
                            }                            
                    }        
                }
            })
        }) 
    }

    useEffect(() => { 
        
        let timer = setTimeout(()=>{
            setOnGoingTime(Date.now())
        },1000)

        // console.log(currentTime)
        if( currentTime <= 0.02 ){
            stopTimer()
            clearInterval(timer)
        }
        getUserTime()
       
    }, [ongoingtime])

    return (
        <>
            <div className='logbutton'>
                <button style={timeSet?TIME_SET_STYLE:null}>
                    {timeSet?(
                        <div className='logbutton_started'>
                            <p>{remainTime}</p>
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
            <Modal open={isOpen} onClose={()=> setIsOpen(false)} Component={TimerView} timeSet={()=> startTimer()}>
                set time
            </Modal>
            {/* <div>{counter}</div> */}

        </>
    )
}

     

export default LogButton
