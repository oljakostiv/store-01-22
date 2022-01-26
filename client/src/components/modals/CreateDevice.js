import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";

const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context);

    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, {title: '', property: '', number: Date.now()}]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new device:
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle variant={"outline-dark"}>Select the type</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                device.types.map(type =>
                                    <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                                )
                            };
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant={"outline-dark"}>Select the brand</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                device.brands.map(brand =>
                                    <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                                )
                            };
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control className='mt-3' placeholder='Enter name'/>
                    <Form.Control className='mt-3' type='number' placeholder='Enter price'/>
                    <hr/>
                    <Form.Control className='mt-3' type='file'/>
                    <hr/>

                    <Button
                        variant={"outline-secondary"}
                        onClick={addInfo}
                    >
                        Add new descriptions
                    </Button>

                    {
                        info.map(i =>
                            <Row className='mt-4' key={i.number}>
                                <Col md={4}>
                                    <Form.Control placeholder='Title'/>
                                </Col>
                                <Col md={4}>
                                    <Form.Control placeholder='Property'/>
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant={"outline-danger"}
                                        onClick={() => removeInfo(i.number)}
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Add</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
