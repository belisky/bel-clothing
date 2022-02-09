import CartActionTypes from './cart.types'

const { TOGGLE_CART_HIDDEN } = CartActionTypes;

export const toggeleCartHidden = () => ({
    type:TOGGLE_CART_HIDDEN
})