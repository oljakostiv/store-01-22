import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <NavLink
                        style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold', fontSize: '20px' }}
                        to={ SHOP_ROUTE }>
                        TechStore
                    </NavLink>

                    { user.isAuth ?
                        <Nav className="ml-auto">
                            <Button variant={ 'outline-secondary' }>Log In</Button>
                            <Button variant={ 'outline-secondary' }
                                    style={{ marginLeft: '1em' }}>
                                Admin panel
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <Button variant={ 'outline-secondary' }
                                    onClick={ () => user.setIsAuth(true) }>Authorisation</Button>
                        </Nav>
                    }

                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;
