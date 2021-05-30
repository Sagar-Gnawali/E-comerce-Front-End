import { PRODUCTS_IS_RECEIVED, PRODUCT_IS_RECEIVED, PRODUCT_IS_REMOVED, SET_IS_FETCHING, SET_IS_LOADING, SET_IS_SUBMITTING } from "../actions/products/type";

const defaultState = {
    products: [],
    isLoading: false,
    isFetching: false,
    product: {},
    isSubmitting: false
}
export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case PRODUCTS_IS_RECEIVED:
            return {
                ...state,
                products: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case PRODUCT_IS_RECEIVED:
            return {
                ...state,
                product: action.payload
            }
        case PRODUCT_IS_REMOVED:
            const { products } = state;
            products.forEach((product, index) => {
                if (product._id === action.id) {
                    products.splice(index, 1);
                }
            })
            return {
                ...state,
                products: [...products]
            }
        case SET_IS_SUBMITTING:
            return {
                ...state,
                isSubmitting: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
