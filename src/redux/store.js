import {createStore,applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './middleware/promiseMiddleware';
import combineReducers from './reducers.js';

let store = createStore(combineReducers,applyMiddleware(promiseMiddleware));

if(module.hot){
    module.hot.accept("./reducers",() => {
        const nextCombineReducers = require("./reducers").default;
        store.replaceReducer(nextCombineReducers);
    })
}

export default store;
