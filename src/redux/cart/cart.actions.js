import CartActionTypes from './cart.types'

const { TOGGLE_CART_HIDDEN ,ADD_ITEM} = CartActionTypes;

export const toggeleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: ADD_ITEM,
    payload:item
})
