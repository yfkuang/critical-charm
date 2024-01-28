import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../../context/sessionContext'
import GenerateButton from '../../generateButton';
import Header from '../../header';
import Footer from '../../footer';
import { Form } from 'react-bootstrap'
import './chat.css'
import { useOpenAI } from '../../../context/openAIContext';

// export class Message {
//     constructor(content) {
//         this.user = user
//         this.content = content
//     }
// }

const Chat = () => {
    const { openAI } = useOpenAI()
    const { activeChat } = useSession()
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        let newMessage = {"role": "system", "content": `You are ` + activeChat.name + `, a ` + activeChat.race + ` ` + activeChat.charClass + `, and you are in dating app-like conversation with the goal of matching to complete a quest. Respond in a single paragraph of 20 words or less in a writing style that ` + activeChat.style1 + ` and that `  + activeChat.style1 + `.`}

        setMessages(messages => [...messages, newMessage])
    }, [])

    const submit = async () => {

        try {
            let newMessage = {
                "role": "user",
                "content": document.getElementById('message').value
            }

            setMessages(messages => [...messages, newMessage])

            const completion = await openAI.chat.completions.create({
                messages: messages,
                model: "gpt-3.5-turbo",
            })

            let completionMessage = {"role": "assistant", "content": JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1)}

            setMessages(messages => [...messages, completionMessage])
            console.log(JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <Container fluid className="chat-container">
                {messages.map((message) => {
                    return (
                        <div className='message-container'>
                            <div className={message.role}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                    )
                })}
            </Container>
            <div className='chat-ui'>
                <Container fluid>
                    <Form.Control as="textarea" id="message" rows={2} />
                    <Button variant="primary" onClick={submit}>Send</Button>
                </Container>
            </div>
            
            <Footer />
        </>
    )
}

export default Chat