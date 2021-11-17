import React from 'react'
import '../Styles/PastLogs.css'

const PastLogs = () => {
    return (
        <>
            <div className='pastlogs'>
                <div className='past_date'>sep 14</div>
                <div className='time'>00:00:00</div>
            </div>
            <div className='no_pastLogs'>
                <div className='pastlog_error'>No Lunch Logged</div>
            </div>
            </>
    )
}

export default PastLogs
