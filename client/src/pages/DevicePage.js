import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import bigStar from '../assets/BigStar.png';
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});

    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, []);

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image src={'http://localhost:5000/' + device.img} width={300} height={300}/>
                </Col>

                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2 className='d-flex justify-content-center'>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240, height: 240, backgroundSize: 'cover', fontSize: 64
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>

                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, border: '4px solid lightgray'}}
                    >
                        <h3>From: {device.price} UAN.</h3>
                        <Button style={{fontSize: 20}} variant={"outline-dark"}>Add to basket</Button>
                    </Card>
                </Col>
            </Row>

            <Row
                className='d-flex flex-column m-3'
            >
                <h1>Descriptions:</h1>
                {
                    device.info.map((info, index) =>
                        <Row
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                            key={info.id}>
                            {info.title}: {info.description}
                        </Row>
                    )
                }
            </Row>
        </Container>
    );
};

export default DevicePage;
