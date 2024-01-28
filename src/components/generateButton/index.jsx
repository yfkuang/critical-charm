import { Button } from 'react-bootstrap'
import { useSession } from '../../context/sessionContext';

const GenerateButton = (props) => {
    const { generateProfile } = useSession()
    const { startGenerationCount } = useSession()
    
    const start = (e) => {
        for (let i = 0; i < startGenerationCount; i++) {
            setTimeout(() => {
                generateProfile()
            }, 6000 * i)
        }
    }

    return (
        <>
            <Button variant="primary" onClick={start}>{props.children}</Button>
        </>
    )
}

export default GenerateButton