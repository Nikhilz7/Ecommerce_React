import { combineReducers } from "redux";

import { userReducer } from './user.reducer';

export const rootReducer = combineReducers({
    //reducers and reducer fuctions key:value

    user: userReducer,
});