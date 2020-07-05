import {combineReducers,createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import filmList from './reducer.js';
import filmPanel from './filmPanel.js';
import favorites from './favorites.js';

const allReducers = combineReducers({
    filmList: filmList,
    filmPanel: filmPanel,
    favorites,
});

const store = createStore(allReducers,  applyMiddleware(thunk));

//Вывод хранилища при изменении (для отладки)
//store.subscribe(() => console.log(store.getState().favorites.favoriteList))

export default store;
