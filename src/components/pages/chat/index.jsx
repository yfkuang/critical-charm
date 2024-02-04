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
    
    useEffect(() => {
        let newMessage = {"role": "system", "content": `You are ` + activeChat.name + `, a ` + activeChat.race + ` ` + activeChat.charClass + `, and you are in dating app-like conversation with the goal of matching to complete a quest. Respond in a single paragraph of 20 words or less in a writing style that ` + activeChat.style1 + ` and that `  + activeChat.style1 + `.`}

        setMessages(messages => [...messages, newMessage])
    }, [])

    const submit = async (e) => {

        if(e.key == "Enter" || e.type == "click") {
            let value = document.getElementById('message').value
            let chat = document.getElementById("chat");
            document.getElementById('message').value = ''
            setTimeout(() => {
                document.getElementById('message').value = ''
                chat.scrollTop = chat.scrollHeight;
            },1)
            console.log(document.getElementById('message').value)

            try {
                let newMessage = {
                    "role": "user",
                    "content": value
                }
    
                setMessages(messages => [...messages, newMessage])
    
                const completion = await openAI.chat.completions.create({
                    messages: messages,
                    model: "gpt-3.5-turbo",
                })
    
                let completionMessage = {"role": "assistant", "content": JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1)}
    
                setMessages(messages => [...messages, completionMessage])
                console.log(JSON.stringify(completion.choices[0]['message']['content']).substring(1,JSON.stringify(completion.choices[0]['message']['content']).length - 1))

                setTimeout(() => {
                    chat.scrollTop = chat.scrollHeight;
                },1)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Header />
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