import { faAngry, faSmileWink } from '@fortawesome/free-regular-svg-icons';
import { faAmbulance, faFaceSmileWink, faTractor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Form,
    Input,
    Button,
    InputGroup,
} from 'reactstrap';
import CartSummery from "../cart/CartSummery";
export default class Navi extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (

            <>
                <Navbar expand="md" className='navbar bg-light p-2 flex-fill bd-highlight '>
                    <NavbarBrand href="/">
                        <h1 class="brand">
                            <i class="fas fa-store"></i>
                            <span> Valley </span> Store
                        </h1></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className='mx-auto '>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/aboutUs">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/products">Shop</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/saveproduct">New Product</NavLink>
                            </NavItem>

                        </Nav>


                        {/* <Form className='d-flex justify-content-center'>

                            <InputGroup className='mb-2  me-4 '>
                                <Input className="bg-light border border-3 border-top-0 border-start-0 border-end-0 border-dark" type="search" placeholder="Search" aria-label="Search" />
                                <Button color='muted' class="bg-light border-0" type="submit">Search</Button>
                            </InputGroup>
                        </Form> */}
                        <CartSummery />
                    </Collapse>
                </Navbar>

            </>

        )
    }
}
