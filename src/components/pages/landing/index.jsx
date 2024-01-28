import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GenerateButton from '../../generateButton'

const Index = () => {

    return (
        <>
            <Link to="/quest"><GenerateButton>Start Your Quest</GenerateButton></Link>
        </>
    )
}

export default Index