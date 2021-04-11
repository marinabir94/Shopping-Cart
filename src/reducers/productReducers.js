//Redux

import { FETCH_PRODUCTS } from "../types"

const initialState = {}

export const productReducers = (state = initialState, action) => {
    switch (action.type){
        case FETCH_PRODUCTS:
            return {items: action.payload};
        default:
            return state;
    }
}