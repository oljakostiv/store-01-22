import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, register} from "../http/userAPI";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;

            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await register(email, password);
            }

            user.setUser(user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className='d-flex justify-content-center'
            style={{marginTop: 200}}
        >
            <Card className='p-4' style={{width: 600}}>
                <h2 className='m-auto'>{isLogin ? 'Log in' : 'Register'}</h2>

                <Form className='d-flex flex-column'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input type="email" className="form-control"
                               id="exampleInputEmail1" aria-describedby="emailHelp"
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                        ></input>
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>

                    <Row className='d-flex justify-content-around mt-1'>
                        {isLogin ?
                            <div className='w-50'>
                                Don't have an account yet? <NavLink to={ REGISTRATION_ROUTE }>Register</NavLink>
                            </div>
                            :
                            <div className='w-50'>
                                Already have an account? <NavLink to={ LOGIN_ROUTE }>Log in</NavLink>
                            </div>
                        }
                        <Button
                            className='w-25'
                            variant={'outline-success'}
                            onClick={click}
                        >
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
