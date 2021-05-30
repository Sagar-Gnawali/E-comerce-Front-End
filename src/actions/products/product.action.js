import { handleError } from "../../utils/handleError.js";
import { HttpClient } from "../../utils/httpClient.js";
import { notify } from "../../utils/toaster.js";
import { PRODUCTS_IS_RECEIVED, PRODUCT_IS_RECEIVED, PRODUCT_IS_REMOVED, SET_IS_FETCHING, SET_IS_LOADING, SET_IS_SUBMITTING } from "./type.js";

export const fetchProducts_ac = params => {
    return dispatch => {
        dispatch({
            type: SET_IS_LOADING,
            payload: true
        })
        HttpClient.GET('/product', true)
            .then(res => {

                dispatch({
                    type: PRODUCTS_IS_RECEIVED,
                    payload: res.data
                })
            })
            .catch(error => {
                handleError(error);
            })
            .finally(() => {
                dispatch({
                    type: SET_IS_LOADING,
                    payload: false
                })
            })
    }
}
export const updateProductStore = data => dispatch => {
    dispatch({
        type: PRODUCTS_IS_RECEIVED,
        payload: data
    })
}
export const removeProduct_ac = (id, productName) => dispatch => {
    HttpClient
        .DELETE(`/product/${id}`, true)
        .then(res => {
            notify.showSuccess(`${productName} removed successfully !`);
            dispatch({
                type: PRODUCT_IS_REMOVED,
                id: id
            })
        })
        .catch(error => {
            handleError(error);
        })
}
export const fetch_product_ac = (params) => {
    return dispatch => {
        dispatch(fetching(true));
        HttpClient.POST('/product/search', { ...params })
            .then((res) => {
                dispatch({
                    type: PRODUCT_IS_RECEIVED,
                    payload: res.data[0]
                })
            })
            .catch((error) => {
                handleError(error);
            })
            .finally(() => {
                dispatch(fetching(false));
            })

    }
}
const fetching = isFetching => {
    return {
        type: SET_IS_FETCHING,
        payload: isFetching
    }
}
export const addReview_ac = (data, product_id) => dispatch => {
    HttpClient
        .POST(`/product/add-ratings/${product_id}`, data, true)
        .then(res => {
            notify.showSuccess(`Ratings added successfully 😃 !`);
            dispatch({
                type: PRODUCT_IS_RECEIVED,
                payload: res.data
            })
        })
        .catch(error => {
            handleError(error);
        })
}
const Submitting = (isSubmitting) => {
    return {
        type: SET_IS_SUBMITTING,
        payload: isSubmitting
    }
}