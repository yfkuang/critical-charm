import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../context/sessionContext'
import { Container } from 'react-bootstrap';
import './header.css'

const Header = (props) => {
    const { lives } = useSession()
    console.log(lives)

    return (
        <>
            <div className="header">
                <Container fluid>
                    Tries: {lives}
                </Container></div>
            {props.children}
        </>
    )
}

export default Header