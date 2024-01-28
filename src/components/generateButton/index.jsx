import { Button } from 'react-bootstrap'
import { useSession } from '../../context/sessionContext';

const GenerateButton = (props) => {
    const { generateProfile } = useSession()
    
    const start = (e) => {
        for (let i = 0; i < 3; i++) {
            generateProfile()
        }
    }

    return (
        <>
            <Button variant="primary" onClick={start}>{props.children}</Button>
        </>
    )
}

export default GenerateButton