import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
class Category extends Component {
    componentDidMount() {
        this.props.actions.getCategories()
    }
    selectCategory = category => {
        this.props.actions.changeCategory(category);
        this.props.actions.getProducts(category.categoryId);
    }
    render() {
        return (
            <div>
                <h5 className='opacity-75'> Categories</h5>
                <ListGroup>
                    {this.props.categories.map(category => (

                        <ListGroupItem key={category.categoryId}
                            onClick={() => this.selectCategory(category)}
                            active={category.categoryId === this.props.currentCategory.categoryId ? true : false}>
                            {category.categoryName}
                        </ListGroupItem>
                    ))}
                </ListGroup>

            </div >
        )
    }
};
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
            changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
            getProducts: bindActionCreators(productActions.getProducts, dispatch),

        }
    }
}

function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        categories: state.categoryListReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);