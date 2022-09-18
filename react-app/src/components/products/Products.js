import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Input, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import alertify from 'alertifyjs';
import * as productActions from '../../redux/actions/productActions';
import * as cartActions from '../../redux/actions/cartActions';
class Products extends Component {
    componentDidMount() {
        this.props.actions.getProducts();
    };
    selectPagination = (page) => {
        this.props.actions.changePage(page);
        this.props.actions.getProducts(this.props.currentCategory.categoryId, page, this.props.pagePerCount);
    };
    selectPerPage = () => {
        let pagePer = document.getElementById("pagePer").value;
        this.props.actions.changePagePerCount(pagePer);
        this.props.actions.getProducts(this.props.currentCategory.categoryId, this.props.page, pagePer);


    };
    addToCart = (product, quantity) => {
        this.props.actions.addToCart({ product, quantity: quantity });
        alertify.notify(product.title + '  added to cart', 'success', 5, function () { console.log('dismissed'); });
    };
    renderPagination() {
        return (
            <>
                <Pagination className='pagination  justify-content-center mt-4'>
                    <PaginationItem key="1" active={this.props.page === 1 ? true : false}>
                        <PaginationLink onClick={() => this.selectPagination(1)}>
                            1
                        </PaginationLink>
                    </PaginationItem >
                    <PaginationItem key="1" active={this.props.page === 2 ? true : false}>
                        <PaginationLink onClick={() => this.selectPagination(2)}>
                            2
                        </PaginationLink>
                    </PaginationItem >
                    <PaginationItem key="1" active={this.props.page === 3 ? true : false}>
                        <PaginationLink onClick={() => this.selectPagination(3)}>
                            3
                        </PaginationLink>
                    </PaginationItem >
                </Pagination>
            </>
        )
    }
    render() {
        return (
            <div>
                <Row>
                    <Col >
                        <Badge color='primary'>Category : {this.props.currentCategory.categoryName}</Badge>
                    </Col>
                    <Col >
                        <Badge color='primary'>Page : {this.props.page}</Badge>
                    </Col>
                    <Col >
                        <Badge color='primary'>Per Page : {this.props.pagePerCount}</Badge>
                    </Col>
                    <Col className='me-3 mt-0'>
                        <Input onChange={() => this.selectPerPage()}
                            id="pagePer"
                            name="pagePer"
                            type="select" >
                            <option disabled >Page Per</option>
                            <option key={1}>
                                10
                            </option>
                            <option key={2}>
                                15
                            </option>
                            <option key={3}>
                                20
                            </option>
                            <option key={4}>
                                30
                            </option>
                        </Input>

                    </Col>
                </Row>
                <Row>
                    {this.props.products.map(product => (

                        <Card className='position-relative ms-3 m-1 p-0 xl-3 shadow rounded border-0' style={{ width: '16rem' }} >
                            <Badge pill className='position-absolute top-0 end-0 m-2' color='danger'>%{product.rating}</Badge>
                            <img alt="Sample" src={product.thumbnail} />
                            <CardBody>
                                <CardTitle tag="h5"> {product.title}</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6" >
                                    {product.brand}
                                </CardSubtitle>
                                <CardText>
                                    {product.description}
                                </CardText>

                            </CardBody>
                            <Row className='d-flex flex-row bd-highlight mb-3'>
                                <Col className='d-flex justify-content-evenly'>
                                    <Badge className='text-muted  bg-white text-dark '><del>{product.price} €</del></Badge>
                                </Col>
                                <Col className='d-flex justify-content-evenly'>
                                    <Badge color='ligth' className='text-success opacity-75 text-400 fw-bolder fs-6 '>{Math.fround(product.price - product.discountPercentage).toFixed(2)} €</Badge>
                                </Col>
                            </Row>
                            <Button onClick={() => this.addToCart(product, 1)} className='btn btn-light opacity-50 m-1'> Add To Card </Button>
                        </Card>

                    ))}
                </Row>
                {this.renderPagination()}


            </div >
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getProducts: bindActionCreators(productActions.getProducts, dispatch),
            changePage: bindActionCreators(productActions.changePage, dispatch),
            changePagePerCount: bindActionCreators(productActions.changePagePerCount, dispatch),
            addToCart: bindActionCreators(cartActions.addToCart, dispatch)
        }
    }
};
function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        products: state.productListReducer,
        page: state.changePageReducer,
        pagePerCount: state.changePagePerCountReducer,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Products);