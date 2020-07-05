import Immutable from 'seamless-immutable';

import {
    OPEN_FILM_PANEL, 
    GET_FILM_INFO,
    GET_FILM_CAST,
    CLOSE_FILM_PANEL
} from '../types';

const initialState = Immutable({
    filmPanel: {
        open: false,
        filmData: {},
        filmCast: []
    }
});

export default function filmPanel(state = initialState, action= {}) {
    switch (action.type) {
        case OPEN_FILM_PANEL:
            return {
                ...state,
                filmPanel: {
                    ...state.filmPanel,
                    open: action.filmPanel.open,
                }
            }
        case GET_FILM_INFO:
            return {
                ...state,
                filmPanel: {
                    ...state.filmPanel,
                    filmData: {...action.filmPanel.filmData},
                }
            }
        case GET_FILM_CAST: 
            return {
                ...state, 
                filmPanel: {
                    ...state.filmPanel,
                    filmCast: [...action.filmPanel.filmCast],
                }
            }
        case CLOSE_FILM_PANEL: 
            return {
                ...state,
                filmPanel: {
                    open: action.filmPanel.open,
                    filmData: {},
                    filmCast: []
                }
            }
        default:
            return state;
    }
}
