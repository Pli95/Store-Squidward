import {combineReducers} from 'redux'
import productsReducer from './productReducer'

const rootReducer = combineReducers({
    products: productsReducer
});

export default rootReducer