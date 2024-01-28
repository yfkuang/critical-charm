import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const CreateProfile = () => {
    

    return (
        <>
            {/* <Form.Control size="lg" type="text" id="answer" placeholder="Answer" onChange={validateAnswer} /> */}
            <Link to="/match"><Button variant="primary">Start Matching</Button></Link>
        </>
    )
}

export default CreateProfile