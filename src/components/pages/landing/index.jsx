import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import QuestionButton from '../../QuestionButton'
import { useAnswer } from '../../../context/answerContext'

const Index = () => {
    const { answerState } = useAnswer()
    const { questions } = useAnswer()
    const { init } = useAnswer()

    useEffect(() => {
        if (answerState.length < 23) {
            init()
        }
    },[])

    return (
        <Container fluid>
            { questions.map( (question, index) =>
                <QuestionButton index={index} key={index}/>
            ) }
        </Container>
    )
}

export default Index