import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";


export class Header extends React.Component {
    renderLogin = () => {
        let isAdmin = true
        let user = true
        if (user && isAdmin) {
            console.log("an admin")
            return (
                <Nav>
                    <NavDropdown id="userDropdown" title={`Welcome User`}>
                        <NavDropdown.Item href="/editStore">Edit Store</NavDropdown.Item>
                        <NavDropdown.Item>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else if (user && !isAdmin) {
            console.log("a user")
            return (
                <NavDropdown id="userDropdown" title={`Welcome User`}>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            console.log('not logged in')
            return (
                <Nav.Link>Login</Nav.Link>
            )

        }
    }
    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top" >
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand href="">
                        <img
                            src="https://www.newscenter1.tv/content/uploads/2020/06/fake-logo.png"
                            width="50"
                            height="50"
                            alt="logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-around">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/shop">Shop</Nav.Link>
                            <NavDropdown title="About">
                                <NavDropdown.Item href="">Contact</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            {this.renderLogin()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}