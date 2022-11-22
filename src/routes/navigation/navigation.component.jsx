import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import './navigation.styles.scss';
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    //when hook useContext changes rerender happens
    // console.log(currentUser);

    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <div><Logo /></div>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser? (
                            <span className='nav-link' onClick={signOutUser}>{' '}Sign Out{' '}</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                Sign In
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
                {/* components are always true since they are functions! if isCartOpen returns true then return cartdropdowncomponent */}
            </div>
            <Outlet /> 
            {/* outlet render rest of the Routes */}
        </Fragment>
    );
};

export default Navigation;