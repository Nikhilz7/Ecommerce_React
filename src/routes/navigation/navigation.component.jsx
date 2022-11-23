import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    //when hook useContext changes rerender happens
    // console.log(currentUser);

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
                    {
                        currentUser? (
                            <NavLink as='span' onClick={signOutUser}>{' '}Sign Out{' '}</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                Sign In
                            </NavLink>
                        )
                    }
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