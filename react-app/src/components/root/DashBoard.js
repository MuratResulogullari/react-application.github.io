import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap'
import Category from '../categories/Category'
import Products from '../products/Products'

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <div className='main-header breadcrumb'>
                    <Breadcrumb listTag="div">
                        <BreadcrumbItem href="/" tag="a">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span"> Store </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Container>
                    <Row>
                        <Col xs="3">
                            <Category />
                        </Col>
                        <Col xs="9">
                            <Products />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
