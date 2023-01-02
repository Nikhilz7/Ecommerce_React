import { combineReducers } from "redux";

import { userReducer } from './user/user.reducer';

import { categoriesReducer } from './categories/category.reducer';

import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
    //reducers and reducer fuctions key:value

    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
});