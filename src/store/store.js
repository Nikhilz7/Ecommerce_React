import { applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
// import {configureStore} from '@reduxjs/toolkit';
// import { loggerMiddleware } from './middleware/logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { legacy_createStore as createStore } from "redux"
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    thunk,
].filter(Boolean);



const composeEnhancer = 
    (process.env.NODE_ENV !== 'production' && 
        window && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = configureStore({
//     reducer: rootReducer, 
//     middleware: [logger]
// });

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);