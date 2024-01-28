import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../../context/sessionContext'
import GenerateButton from '../../generateButton';
import Header from '../../header';
import Footer from '../../footer';
import './matches.css'

const Matches = () => {
    const { matches } = useSession()
    const { setActiveChat } = useSession()

    const click = (match) => {
        console.log(match)
        setActiveChat(match)
    }

    return (
        <>
            <Header />
                <div className='chat-container'>
                    {matches.map((match) => {
                        return (
                            <div className='match'>
                                <img src={match.image} alt={match.image}/>
                                <Link to="/chat" onClick={click(match)}>{match.name} | {match.race}</Link>
                            </div>
                        )
                    })}
                </div>
            <Footer />
        </>
    )
}

export default Matches