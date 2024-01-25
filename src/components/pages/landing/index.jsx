import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useOpenAI } from '../../../context/openAIContext'

const Index = () => {
    const [message, setMessage] = useState("Loading...")
    const { openAI } = useOpenAI()

    const fetchMessage = async () => {
        try {
            const completion = await openAI.chat.completions.create({
                messages: [{ role: "system", content: "Why do ducks eat bread? Answer in 2 sentences or less." }],
                model: "gpt-3.5-turbo",
                max_tokens: 100
            });
            
            setMessage(JSON.stringify(completion.choices[0]['message']['content']))
        } catch (error) {
            console.log(error)
            setMessage("Error generating description")
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return (
        <Container fluid>
            <p>{message}</p>
        </Container>
    )
}

export default Index