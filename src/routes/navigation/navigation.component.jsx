import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
  
    const signOutUser = () => dispatch(signOutStart());
  
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <div><Logo /></div>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                        Sign Out
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>Sign In</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
                {/* components are always true since they are functions! if isCartOpen returns true then return cartdropdowncomponent */}
            </NavigationContainer>
            <Outlet /> 
            {/* outlet render rest of the Routes */}
        </Fragment>
    );
};

export default Navigation;