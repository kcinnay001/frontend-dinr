import React from 'react'
import '../Styles/Home.css'

const DateComponent = (separator='') => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (
        <div className='date'>
            {`${date}/${month<10?`0${month}`:`${month}`}/${year}`}
        </div>
        )
}

export default DateComponent
