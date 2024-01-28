import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSession } from '../../context/sessionContext'
import { Container } from 'react-bootstrap';
import './header.css'

const Header = (props) => {
    return (
        <>
            <div className="header"><Container fluid><h1>Header</h1></Container></div>
            {props.children}
        </>
    )
}

export default Header