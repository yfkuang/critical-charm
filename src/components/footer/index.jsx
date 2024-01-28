import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../context/sessionContext'
import { Container } from 'react-bootstrap';
import './footer.css'

const Footer = (props) => {


    return (
        <>
            <div className="footer"><Container fluid><h1>Footer</h1></Container></div>
        </>
    )
}

export default Footer