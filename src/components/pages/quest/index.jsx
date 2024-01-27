import { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../../context/sessionContext';

const Quest = () => {
    const { generateQuest } = useSession()
    
    useEffect(() => {
        generateQuest()
    }, [])

    return (
        <>
            <Link to="/quest"><Button variant="primary">Create Your Profile</Button></Link>
        </>
    )
}

export default Quest