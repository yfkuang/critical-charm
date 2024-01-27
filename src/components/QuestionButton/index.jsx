import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './QuestionButton.css'
import { useAnswer } from '../../context/answerContext'

const QuestionButton = (props) => {
    const { answerState } = useAnswer()

    useEffect(() => {
        if(answerState.length !== 0 && answerState[props.index][1]) {
            document.querySelector('.question-button[index="' + props.index + '"]').style.background = 'green'
        }
    })

    return (
        <Link to={`/` + props.index}>
            <Button className='question-button' index={props.index} variant="secondary">{props.index + 1}</Button>
        </Link>
    )
}

QuestionButton.propTypes = {
    index: PropTypes.number
}

export default QuestionButton