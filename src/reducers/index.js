import { combineReducers } from 'redux';
import { productReducer } from './product.red';
import { userReducer } from './user.red';

export default combineReducers({
    product: productReducer,
    user: userReducer
})