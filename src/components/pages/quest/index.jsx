import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../../context/sessionContext'
import GenerateButton from '../../generateButton';

const Quest = () => {
    const { quests } = useSession()
    const { generateQuest } = useSession()
    const { generateProfile } = useSession()
    const [questDescription, setQuestDescription] = useState(["Loading Quest..."])
    
    useEffect(() => {
        generateQuest()
        for (let i = 0; i < 3; i++) {
            generateProfile()
        }
    }, [])

    useEffect(() => {
        if(quests.length > 0) {
            setQuestDescription(quests[0].description)
            console.log(quests[0])
        }
    }, [quests])

    return (
        <>
            <h1>Your Quest</h1>
            {questDescription.map((desc, key) => {
                return (
                    <>
                        <p key={key} >{desc}</p>
                    </>
                )
            })}
            <p><b>Match with 4 other adventurers to complete this quest!</b></p>
            <Link to="/createprofile"><GenerateButton>Create Your Profile</GenerateButton></Link>
        </>
    )
}

export default Quest