import * as types from '../actions/actionTypes'

export default function productsReducer(state = [], action) {
    switch (action.type) {
        case types.SET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}