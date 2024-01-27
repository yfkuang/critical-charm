import React from 'react'
import PropTypes from 'prop-types'
import './bio.css'

const Bio = (props) =>{
  return (
    <div className='bio-entry'>{props.bioEntry}</div>
  )
}

Bio.propTypes = {
    bioEntry: PropTypes.string
}

export default Bio