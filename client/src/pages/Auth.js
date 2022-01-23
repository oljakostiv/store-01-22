import React from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation();

    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Container
            className='d-flex justify-content-center'
            style={{marginTop: 200}}
        >
            <Card className='p-4' style={{width: 600}}>
                <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>

                <Form className='d-flex flex-column'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input type="email" className="form-control"
                               id="exampleInputEmail1" aria-describedby="emailHelp"
                        ></input>
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control" id="exampleInputPassword1"></input>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>

                    <Row className='d-flex justify-content-around mt-1'>
                        {isLogin ?
                            <div className='w-50'>
                                No account? <NavLink to={ REGISTRATION_ROUTE }>Registering</NavLink>
                            </div>
                            :
                            <div className='w-50'>
                                Account exist? <NavLink to={ LOGIN_ROUTE }>Log in</NavLink>
                            </div>
                        }
                        <Button
                            className='w-25'
                            variant={'outline-success'}
                        >
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
