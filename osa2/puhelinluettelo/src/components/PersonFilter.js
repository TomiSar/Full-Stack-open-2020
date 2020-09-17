import React from 'react'

const PersonFilter = ({filter, onFilterChange}) => {
    return (
      <p>filter shown with <input value={filter} onChange={onFilterChange}/></p>
    )
  }

export default PersonFilter