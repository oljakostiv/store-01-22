import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Container, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context);

    return (
        <Row>
                {
                    device.brands.map(brand =>
                        <Card
                            className='p-3 w-auto'
                            style={{margin: 20, cursor: 'pointer'}}
                            onClick={() => device.setSelectedBrand(brand)}
                            border={brand.id === device.selectedBrand.id ? 'success' : 'light'}
                            key={brand.id}
                        >
                            {brand.name}
                        </Card>
                    )
                }
        </Row>
    );
});

export default BrandBar;
