import { applyMiddelware, compose } from 'redux';
import logger from 'redux-logger';
// import {configureStore} from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from "redux"
import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddelware(...middleWares));

// export const store = configureStore({
//     reducer: rootReducer, 
//     middleware: [logger]
// });

export const store = createStore(rootReducer, undefined, composedEnhancers);