import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const initialState = {
    product: {
        products: [],
        isLoading: false,
        isFetching: false,
        product: {},
        isSubmitting: false
    }
}
export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
