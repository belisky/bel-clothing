import React from 'react';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggeleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';


const CartIcon  = ({toggeleCartHidden}) => {
    return (
        <div className="cart-icon" onClick={toggeleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className="item-count">0</span>
         </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    toggeleCartHidden:()=>dispatch(toggeleCartHidden())
})

export default connect(null,mapDispatchToProps)( CartIcon);

