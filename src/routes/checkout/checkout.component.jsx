import { useContext } from "react";
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-Item/checkout-item.component';

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
  } from './checkout.styles';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock><span>Products</span></HeaderBlock>
                <HeaderBlock><span>Description</span></HeaderBlock>
                <HeaderBlock><span>Quantity</span></HeaderBlock>
                <HeaderBlock><span>Price</span></HeaderBlock>
                <HeaderBlock><span>Remove</span></HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
            }
            <Total>Total: Rs.{cartTotal}</Total> 
        </CheckoutContainer>
    );
};

export default Checkout;