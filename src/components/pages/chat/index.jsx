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


const Chat = () => {
    const { openAI } = useOpenAI()
    const { activeChat } = useSession()
    const [messages, setMessages] = useState([])
    const chat = document.getElementById("chat");
    console.log(activeChat)
    
    useEffect(() => {
        let newMessage = {"role": "system", "content": `You are ` + activeChat.name + `, a ` + activeChat.race + ` ` + activeChat.charClass + `, and you are in dating app-like conversation with the goal of matching to complete a quest. Respond in a single paragraph of 10 words or less in a writing style that ` + activeChat.style1 + ` and that `  + activeChat.style1 + `.`}

        setMessages(messages => [...messages, newMessage])
    }, [])

    useEffect(() => {
        if(messages.length > 0) {
            if(messages[messages.length - 1].role == 'user') {
                request()
            }
        }
    }, [messages])

    const submit = async (e) => {
        if(e.key == "Enter" || e.type == "click") {
            let value = document.getElementById('message').value
            
            document.getElementById('message').value = ''
            setTimeout(() => {
                document.getElementById('message').value = ''
                chat.scrollTop = chat.scrollHeight;
            },1)

            let newMessage = {
                "role": "user",
                "content": value
            }

            setMessages(messages => [...messages, newMessage])
        }
    }

    const request = async () => {
        try {
            const completion = await openAI.chat.completions.create({
                messages: messages,
                model: "gpt-3.5-turbo",
            })

            let completionMessage = {"role": "assistant", "content": JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1)}

            setMessages(messages => [...messages, completionMessage])

            setTimeout(() => {
                chat.scrollTop = chat.scrollHeight;
            },1)
        } catch (error) {
            console.log(error)
        }

        console.log(messages)
    }

    return (
        <>
            <Header />
            <div className='chat-header'>
                <Container fluid>
                    <img className='chat-header-image' src={activeChat.image} alt={activeChat.name} />
                    <div className='chat-header-text'>
                        <h2>{activeChat.name}</h2>
                        <h4>{activeChat.race} {activeChat.charClass}</h4>
                    </div>
                    
                </Container>
            </div>
            <Container fluid className="chat-container" id="chat">
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
                    <Form.Control as="textarea" id="message" rows={2} autofocus onKeyDown={submit} />
                    <Button variant="primary" onClick={submit}>Send</Button>
                </Container>
            </div>
            
            <Footer />
        </>
    )
}

export default Chat