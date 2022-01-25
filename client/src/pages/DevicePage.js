import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/BigStar.png';

const DevicePage = () => {
    const device = {
        id: 3,
        name: "AirPods 3",
        price: 7000,
        rating: 0,
        img: "5e7d8b10-3208-4605-85b1-bf4dd0720a82.jpg"
    };

    const description = [
        {id: 1, title: 'Size (earbud)', description: '30.8 x 18.3 x 19.2 mm'},
        {id: 2, title: 'Size (case)', description: '46.4 x 21.4 x 54.4 mm'},
        {id: 3, title: 'Weight (earbud)', description: '4.3g'},
        {id: 4, title: 'IP certification', description: 'IPX4'},
        {id: 5, title: 'Fit type', description: 'Open'}
    ];

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image src={device.img} width={300} height={300}/>
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
                    description.map((info, index) =>
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
