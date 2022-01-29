import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        fetchType().then(data => device.setTypes(data));
        fetchBrand().then(data => device.setBrands(data));
        fetchDevice(null, null, 1, 4).then(data => {
            device.setDevices(data.rows)    //бо є пагінація;
            device.setTotalCount(data.count)
        });
    }, []);

    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 4)
            .then(data => {
                device.setDevices(data.rows)    //по умові пагінації;
                device.setTotalCount(data.count)
            });
    }, [device.page, device.selectedType, device.selectedBrand]);  //для оновлення сторінки;

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
