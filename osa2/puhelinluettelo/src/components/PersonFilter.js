import React from 'react'

const PersonFilter = (props) => {
    return (
        <div>
            filter shown with <input onChange={event => props.setFilter(event.target.value)} value={props.filter} /> 
        </div>
    )
}

export default PersonFilter