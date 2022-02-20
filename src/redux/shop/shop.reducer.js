// import SHOP_DATA from "./shop.data";
import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
    collections:null
}

const {UPDATE_COLLECTIONS}=ShopActionTypes

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case UPDATE_COLLECTIONS:
            return {
                ...state,
                collections:payload
          }  
        default:
            return state;
    }
}

export default shopReducer;