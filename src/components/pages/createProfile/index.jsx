import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GenerateButton from '../../generateButton'

const CreateProfile = () => {
    

    return (
        <>
            <Link to="/match"><GenerateButton>Start Matching</GenerateButton></Link>
        </>
    )
}

export default CreateProfile