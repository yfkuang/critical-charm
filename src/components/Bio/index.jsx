import React from 'react'
import PropTypes from 'prop-types'

const Bio = (props) =>{
  return (
    <div>{props.bioEntry}</div>
  )
}

Bio.propTypes = {
    bioEntry: PropTypes.string
}

export default Bio