import React, {useState, useEffect} from 'react'
import './question.css'
import { useParams,
        Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import freedom from '../../../assets/freedom.jpg'
import { useAnswer } from '../../../context/answerContext';

export const Question = () => {
    const { id } = useParams();
    const [hint, setHint] = useState(false)
    const { answerState } = useAnswer()
    const { setAnswerState } = useAnswer()
    const { questions } = useAnswer()

    useEffect(() => {
        if(answerState[id][1]) {
            document.getElementById('answer').style.background = '#DFFFE9'
            document.getElementById('answer').disabled = true
            document.getElementById('answer').value = answerState[id][2]
            document.getElementById('hintButton').disabled = true
        }
    }, [])

    useEffect(() => {
        if (hint === false) {
            document.getElementById('hint').style.visibility = 'hidden'
        } else {
            document.getElementById('hint').style.visibility = 'visible'
        }
    })

    const validateAnswer = (e) => {
        if (!questions[id].answers.some(answer => e.target.value.toUpperCase()  === answer.toUpperCase() )) {
            e.target.style.background = '#FFCCCB'
        } else {
            e.target.style.background = '#DFFFE9'
            e.target.disabled = true
            document.getElementById('hintButton').disabled = true
            let newArray = answerState
            newArray[id][1] = true
            newArray[id][2] = e.target.value
            setAnswerState(newArray)
        }
    }

    return (
        <Container className='question-container'>
            { id == 21 ? <img src={freedom} alt="Freedom"/> : null }
            <p>{ questions[id].question }</p>
            <Form.Control size="lg" type="text" id="answer" placeholder="Answer" onChange={validateAnswer} />
            <div>
                <Button variant="warning" id="hintButton" onClick={() => setHint(!hint)}>Hint</Button><br />
                <p id="hint">{ questions[id].hint }</p>
            </div>
            <div>
                <Link to="/"><Button>Go back</Button></Link>
            </div>
        </Container>
    )
}

export default Question