import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import alertify from "alertifyjs";
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import { Link } from "react-router-dom";
class CartSummery extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            total: 0.0,
        };
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    calculateSummaryTotal() {
        let total = 0;
        this.props.cart.map(cartItem => (total = total + (cartItem.product.price * cartItem.quantity)))
        return total;
    }

    message = () => {
        alertify.notify('Your cart is empty please product add to cart !', 'warning', 5, function () { console.log('dismissed'); });
    }
    removeFromCart(product) {
        this.props.actions.removeFromCart(product);
        alertify.error(product.title + " deleted from cart");
    }
    renderEmpty() {
        return (
            <FontAwesomeIcon onClick={() => this.message()} icon={faCartShopping} />
        )
    };
    renderSummery() {
        return (
            <>
                <Button color="ligth" onClick={this.toggle} type="button" className='border-0'>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span class=" translate-middle badge rounded-pill bg-success">
                        {this.props.cart.length > 0 ? this.props.cart.length : ""}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="position-absolute top-0 end-0 m-0 ">
                    <ModalHeader toggle={this.toggle}>Cart Summery</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.cart.map(cartItem => (
                                    <tr>
                                        <td><img width={50} src={cartItem.product.thumbnail}></img></td>
                                        <td>{cartItem.product.title}</td>
                                        <td>{cartItem.product.price}</td>
                                        <td> {cartItem.quantity}</td>
                                        <td>{Math.floor(cartItem.product.price * cartItem.quantity).toFixed(2)}</td>
                                        <td><FontAwesomeIcon icon={faTrash} onClick={() => this.removeFromCart(cartItem.product)} /></td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                        <h6 className='d-flex justify-content-evenly'>Total Summary : {this.calculateSummaryTotal()}</h6>
                    </ModalBody>
                    <ModalFooter className='d-flex justify-content-evenly'>
                        <Link color='white' onClick={this.toggle} className='btn btn-outline-dark opacity-75' to={"/cart"}>Go To Cart</Link>
                    </ModalFooter>
                </Modal>
            </>
        )
    };

    render() {
        return (
            <div className='d-flex justify-content-between'>
                {this.props.cart.length > 0 ? this.renderSummery() : this.renderEmpty()}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartSummery);