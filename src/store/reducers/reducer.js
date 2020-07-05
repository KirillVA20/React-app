import Immutable from 'seamless-immutable';

import {
    FILM_SEARCH_SUCCESS,
    FILM_SEARCH_STARTED,
    FILM_SEARCH_EMPTY,
    OPEN_FAVORITE_LIST,
    OPEN_SEARCH_LIST
} from '../types';

const initialState = Immutable({
   filmList: [

   ],
   openList: 'search',
   status: 'none',
});

export default function filmList(state = initialState, action= {}) {
    switch (action.type) {
        case FILM_SEARCH_SUCCESS:
            return {
                ...state,
                filmList: action.filmList,
                status: 'success',
            }
        case FILM_SEARCH_STARTED: 
            return {
                ...state,
                status: 'search',
            }
        case FILM_SEARCH_EMPTY:
            return {
                ...state,
                status: 'empty'
            }
        case OPEN_FAVORITE_LIST: 
            return {
                ...state,
                openList: 'favorites',
            }
        case OPEN_SEARCH_LIST:
            return {
                ...state,
                openList: 'search',
            }
        default:
            return state;
    }
}
