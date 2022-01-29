import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchType} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);

    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchType().then(data => device.setTypes(data));
        fetchBrand().then(data => device.setBrands(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addDevice = () => {
        const formData = new FormData();    //для постеджер, замість строки;

        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));  //бо масив потрібно перевести в строку;

        createDevice(formData).then(data => onHide());
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
                        <Dropdown.Toggle variant={"outline-dark"}>
                            {device.selectedType.name || 'Select the type'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                device.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )
                            };
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant={"outline-dark"}>
                            {device.selectedBrand.name || 'Select the brand'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                device.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )
                            };
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control className='mt-3'
                                  value={name}
                                  onChange={e => setName(e.target.value)}
                                  placeholder='Enter name'/>
                    <Form.Control className='mt-3'
                                  type='number'
                                  value={price}
                                  onChange={e => setPrice(Number(e.target.value))}
                                  placeholder='Enter price'/>
                    <hr/>

                    <Form.Control className='mt-3'
                                  type='file'
                                  onChange={selectFile}
                    />
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
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) =>
                                        changeInfo('title', e.target.value, i.number)}
                                        placeholder='Title'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) =>
                                        changeInfo('description', e.target.value, i.number)}
                                        placeholder='Property'
                                    />
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
                <Button variant={"outline-success"} onClick={addDevice}>Add</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
