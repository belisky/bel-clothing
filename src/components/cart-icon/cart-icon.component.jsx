import React from 'react';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggeleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon  = ({toggeleCartHidden,itemCount}) => {
    return (
        <div className="cart-icon" onClick={toggeleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className="item-count">{itemCount}</span>
         </div>
    );
};

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})

const mapDispatchToProps = (dispatch) => ({
    toggeleCartHidden:()=>dispatch(toggeleCartHidden())
})

export default connect(null,mapDispatchToProps)( CartIcon);

