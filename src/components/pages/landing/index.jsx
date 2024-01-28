import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../../context/sessionContext';

const Index = () => {
    const { generateProfile } = useSession()
    
    const start = (e) => {
        for (let i = 0; i < 8; i++) {
            generateProfile()
        }
        console.log('Start')
    }

    return (
        <>
            <Link to="/quest"><Button variant="primary" onClick={start}>Start Your Quest</Button></Link>
        </>
    )
}

export default Index