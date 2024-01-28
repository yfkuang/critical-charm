import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../context/sessionContext'
import { Container } from 'react-bootstrap';
import './footer.css'

const Footer = (props) => {


    return (
        <>
            <div className="footer">
                <Container fluid>
                    <Link to="/match"><i class="bi bi-heart-fill"></i></Link>
                    <Link to="/matches"><i class="bi bi-chat-fill"></i></Link>
                </Container>
            </div>
        </>
    )
}

export default Footer