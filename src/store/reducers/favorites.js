import Immutable from 'seamless-immutable';
import {ADD_FAVORITE, DELETE_FAVORITE} from '../types.js';

const initialState = Immutable({
        favoriteList: []
});

export default function favorites(state=initialState, action={}) {
    switch(action.type) {
        case ADD_FAVORITE :
            return {
                ...state,
                favoriteList: [
                    ...state.favoriteList, 
                    action.favorite
                ]
            }
        
        case DELETE_FAVORITE :
            return {
                ...state,
                favoriteList : [...action.favoriteList],
            }

        default: 
            return state;
    }
}


