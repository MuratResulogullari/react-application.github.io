import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct, getProducts } from "../../redux/actions/productActions";
import CreateProduct from './CreateProduct';
import { useParams } from 'react-router-dom';
function AddOrUpdateProduct({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    history,
    ...props
}) {

    //Destructuring assignment
    const [product, setProduct] = useState({ ...props.product });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        if (products.length === 0) {
            getProducts();
        }
        setProduct({ ...props.product })
        /** const product === with props.product */
    }, [props.product] //when props have had product,  loop exit
    );

    function handleChange(event) {
        /** create object set target.name and target.value */
        const { name, value } = event.target;
        /** previousProduct = this const [product, setProduct] */
        setProduct(previousProduct => (
            {
                ...previousProduct,
                [name]: name === "CategoryId" ? parseInt(value, 10) : value
            }));
        validation(name, value);

    }
    function validation(name, value) {
        if (name === "title" && value === "") {
            setErrors(previousErrors => ({ ...previousErrors, title: "Product title required." }));
        }
        else {
            setErrors(previousErrors => ({ ...previousErrors, title: "" }));

        }
    }
    function handleSave(event) {
        event.preventDefault(); // for submit dont refresh page
        saveProduct(product).then(() => {
            history.push("/")  // Go to this url
        });
    }
    return (
        <CreateProduct product={product} categories={categories} onChange={handleChange} onSave={handleSave} errors={errors} />
    )

}

export function getProductById(products, productId) {
    let findProduct = products.find(p => p.id == productId) || null;
    return findProduct;
}



function mapStateToProps(state, ownProps) {
    const productId = 12;
    const product = productId && state.productListReducer.length > 0
        ? getProductById(state.productListReducer, productId)
        : {};
    return {
        product: product,
        products: state.productListReducer,
        categories: state.categoryListReducer,
    }

}

const mapDispatchToProps = {
    getCategories,
    getProducts,
    saveProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);