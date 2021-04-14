import { CLEAR_ORDER, CREATE_ORDER } from "../types"

const initialState = {}

const orderReducers = (state = initialState, action) => {
    switch(action.type){
        case CREATE_ORDER:
            return {
                order: action.payload
            };
        case CLEAR_ORDER:
            return{
                order: null
            };
        default:
            return state;
    }
};

export {orderReducers};