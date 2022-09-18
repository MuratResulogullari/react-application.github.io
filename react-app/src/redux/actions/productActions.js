import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {

    return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}
/**Product CRUD  */
export function createProductSuccess(product) {
    return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product }
}
export function updateProductSuccess(product) {
    return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product }
}
export function getProductByIdSuccess(product) {
    return { type: actionTypes.GET_PRODUCT_BY_ID_SUCCESS, payload: product }
}

export function getProducts(category, page, pagePerCount) {
    return function (dispatch) {
        let url = `http://localhost:3000/products?`;
        if (category) {
            url = url + `categoryId=${category}`;
        }
        url = url + `&_page=${page}_&_limit=${pagePerCount}`;
        return fetch(url).then(response => response.json())
            .then(result => dispatch(getProductsSuccess(result)));
    };
}
export function getProductById(productId) {
    return function (dispatch) {
        let url = `http://localhost:3000/products?id=${productId}`;
        console.log(url);
        return fetch(url).then(response => response.json())
            .then(result => dispatch(getProductByIdSuccess(result)));
    };
}
export function changePage(page) {
    return { type: actionTypes.CHANGE_PAGE, payload: page }
}
export function changePagePerCount(pagePerCount) {
    return { type: actionTypes.CHANGE_PAGEPERCOUNT, payload: pagePerCount }
}

/** API  */

export function saveProductApi(product) {

    return fetch('http://localhost:3000/products/' + (product.id || ""), {
        method: product.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product) // Then request is string, product converted 
    }).then(handleResponse).catch(handleError);
}

export function saveProduct(product) {
    product.thumbnail = "https://dummyjson.com/image/i/products/36/" + product.thumbnail.split("\\")[2];
    product.images = [
        "https://dummyjson.com/image/i/products/36/" + product.images.split("\\")[2]
    ];

    return function (dispatch) { // our action called in here
        return saveProductApi(product).then(result => {
            product.id
                ? dispatch(updateProductSuccess(result))
                : dispatch(createProductSuccess(result));
        }).catch(error => { throw error });
    }
}

/** Errors  */
export async function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    const error = await response.text()
    throw new Error(error);
}
export function handleError(error) {
    console.error("Resulted error : " + error);
    throw error;
}