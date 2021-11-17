import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const GroupView = ({onClose}) => {

    const joinTeam = () => {
        onClose()
    }
    
    return (
        <div className='modal_group'>
            <div className='modal_group_search'>
                <FontAwesomeIcon className='modal_group_search_icon' icon={faSearch}></FontAwesomeIcon>
            </div>
            <div className='modal-group_teams'>
                <div className='modal_group_teams_name'>
                    Muira Team
                </div>
                <div className='modal_group_teams_join'>
                    <button onClick={joinTeam}>join</button>
                </div>
            </div>
        </div>
    )
}

export default GroupView
