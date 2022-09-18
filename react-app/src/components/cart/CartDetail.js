import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Table, Container, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import alertify from "alertifyjs";
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';

class CartDetail extends Component {
    removeFromCart(product) {
        this.props.actions.removeFromCart(product);
        alertify.error(product.title + " deleted from cart");
    }
    renderDetail() {
        return (
            <>
                <div className='main-header breadcrumb'>
                    <Breadcrumb listTag="div">
                        <BreadcrumbItem href="/" tag="a">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span"> Create Product </BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <Container>
                    <h4>Cart Detail</h4>
                    <hr />
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
                                    <td>{cartItem.quantity}</td>
                                    <td>{Math.floor(cartItem.product.price * cartItem.quantity).toFixed(2)}</td>
                                    <td><FontAwesomeIcon icon={faTrash} onClick={() => this.removeFromCart(cartItem.product)} /></td>
                                </tr>

                            ))}

                        </tbody>

                    </Table>
                </Container>
            </>
        )
    }
    renderEmpty() {
        return (
            <Alert color='danger'><p className='d-flex justify-content-center'>Your cart is empty !</p></Alert>
        )
    }
    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderDetail() : this.renderEmpty()}
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
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);