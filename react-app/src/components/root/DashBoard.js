import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import Category from '../categories/Category'
import Products from '../products/Products'

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs="3">
                        <Category />
                    </Col>
                    <Col xs="9">
                        <Products />
                    </Col>
                </Row>
            </div>
        )
    }
}
