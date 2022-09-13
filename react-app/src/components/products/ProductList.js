import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as productActions from '../../redux/actions/productActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Alert, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
class ProductList extends Component {
    componentDidMount() {
        if (this.props.products.length === 0) {
            this.props.actions.getProducts();
        }
    };
    removeProduct = (productId) => {
        console.log(productId);
    };
    renderEmpty() {
        return (
            <>
                <Alert className='alert-warning'>Product don't find</Alert>
            </>
        )
    }
    renderProductList() {
        return (
            <>
                <h2>Product List</h2>
                <hr />
                <Link to="/saveproduct" className='btn btn-success'>New Product</Link>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount Percentage</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product => (
                            <tr >
                                <th><img src={product.thumbnail} width={40} alt={product.title}></img></th>
                                <th>{product.title}</th>
                                <th>{product.description}</th>
                                <th>{product.price}</th>
                                <th>{product.discountPercentage}</th>
                                <th>{product.rating}</th>
                                <th>{product.stock}</th>
                                <th>{product.brand}</th>
                                <th>{product.category}</th>
                                <th>
                                    <Link to={"/saveproduct/" + product.id}><FontAwesomeIcon icon={faPen} /></Link>
                                    <FontAwesomeIcon onClick={() => this.removeProduct(product.id)} icon={faTrash} />

                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
    render() {
        return (
            <div>
                {this.props.products.length > 0 ? this.renderProductList() : this.renderEmpty()}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getProducts: bindActionCreators(productActions.getProducts, dispatch),
        }
    }
};
function mapStateToProps(state) {

    return {
        products: state.productListReducer,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);