
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { useState } from 'react'
import { FiUser } from 'react-icons/fi';
import { RiStoreLine } from 'react-icons/ri';
import { BsCart4 } from 'react-icons/bs';


const NavBar = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token")

        if (token){
            setShow(true)
        } else {
            navigate("/login")
        }
        
    }
   
    return (
        <>
        <Navbar bg="primary" variant="primary">
            <Container >
            <div className='container-navbar-big'>
            <Navbar.Brand style={{ color: 'white'}} as={ Link } to="/" >E-Commerce</Navbar.Brand>
                <div className='container-navbar'>
                    <Nav.Link as={ Link } to="/login"><FiUser style={{width: 70, color: 'white', }} size={30} /></Nav.Link>
                    <Nav.Link as={ Link } to="/purchases"><RiStoreLine style={{width: 70, color: 'white'}} size={30}/></Nav.Link>
                    <Nav.Link onClick={ handleShow }><BsCart4 style={{width: 70, color: 'white'}} size={30}/></Nav.Link>
                </div>
            </div>
                
            </Container>
            </Navbar>
        <SideBar
        show={show}
        handleClose={handleClose}
        />
        </>
    )
}

export default NavBar;
