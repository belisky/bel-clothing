import React from 'react';
import './header.styles.scss';
 import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../config/firebase.config';
import CartIcon from '../cart-icon/cart-icon.component';
import { connect } from 'react-redux';
import CartDropdown from '../cart-dropdown/cart-dropdown.components';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';


import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink  } from './header.styles';

const Header = ({currentUser,hidden}) => {
    return (

        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo'/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP 
                </OptionLink>
                <OptionLink to='option'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                        (< OptionLink as='div' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </OptionLink>) :
                        <OptionLink to='/signin' >
                            SIGN IN
                        </OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null :

                    <CartDropdown />
            }

        </HeaderContainer>
    )
        ;
};
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})

export default connect(mapStateToProps) (Header);
