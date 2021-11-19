import React,{useEffect,useState} from 'react'
import '../Styles/PastLogs.css'
import Axios from 'axios' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'

const PastLogs = () => {

const [userId,setUserId] = useState(0)
const [timeData,setTimeData] = useState([])

// let timeData = []
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

const deleteTime = (id) => {
    Axios({
        method:'DELETE',
        withCredentials:true,
        url:'http://localhost:4000/time/deletetime/'+userId+'/'+id
    }).then(()=>{
        window.location.reload()
    })
}
    
useEffect(() => {
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
            if(times.data.length > 0){
               setTimeData(times.data)      
            }
        })
    })
}, [])

  console.log(timeData)

    return (
        
        <>
        
        { timeData.map((val,ind)=>{
            // console.log(val)
            const finishTime = timeConvert(val.finalTime);
            if(timeData.length > 0 ){
                if(!(timeData.status)){

                    return(
                        <div key={ind}>
                            <div className='pastlogs' >
                                <div className='past_date'>{val.date}</div>
                                <div className='time'>{finishTime} <span><FontAwesomeIcon onClick={()=>deleteTime(val._id)} style={{color:'gray', opacity:0.3}} icon={faMinusSquare}></FontAwesomeIcon></span></div>
                            </div>
                          
                        </div>
                    )
                }
            } else  {
                return (
                    <div className='no_pastLogs' key={ind}>
                        <div className='pastlog_error'>No Lunch Logged</div>
                    </div>
                )
            }
            
        })}
        </>
    )
}

export default PastLogs
