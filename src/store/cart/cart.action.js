import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

//ADDING ITEMS TO CART FUNCTION
export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    //check if the product is already added? increment quantity if so :or: create new array
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };
  
  //REMOVING ITEMS FROM CART FUNCTION
  const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart to removeCartItem
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    //if quantity is 1 remove item from cart entirely
    if(existingCartItem.quantity === 1){
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
  
    // return cartitems after decrementing
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
  
  };

  
//CLEARING COMPLETE CART FUNCTION
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);


export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) =>{
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export  const removeItemFromCart = (cartItems, cartItemToRemove) =>{
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
     
export const clearItemFromCart = (cartItems, cartItemToClear) =>{
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}