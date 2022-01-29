import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {Context} from "../index";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <NavLink
                        style={{textDecoration: 'none', color: 'grey', fontWeight: 'bold', fontSize: '20px'}}
                        to={SHOP_ROUTE}
                    >
                        TechStore
                    </NavLink>

                    {user.isAuth ?
                        <Nav className="ml-auto">
                            <Button onClick={() => navigate(ADMIN_ROUTE)}
                                    variant={'outline-secondary'}
                            >
                                Admin
                            </Button>
                            <Button onClick={() => logOut()}
                                    variant={'outline-secondary'}
                                    style={{marginLeft: 20}}
                            >
                                Log Out
                            </Button>

                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <Button onClick={() => navigate(LOGIN_ROUTE)}
                                    variant={'outline-secondary'}
                            >
                                Log in
                            </Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;
