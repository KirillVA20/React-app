
import {
    FILM_SEARCH_SUCCESS,
    FILM_SEARCH_STARTED,
    FILM_SEARCH_EMPTY,
    OPEN_FAVORITE_LIST,
    OPEN_SEARCH_LIST,
    OPEN_FILM_PANEL,
    GET_FILM_INFO,
    GET_FILM_CAST,
    CLOSE_FILM_PANEL,
    ADD_FAVORITE,
    DELETE_FAVORITE
} from '../types';
import store from '../reducers/index.js';

//Поиск фильмов по запросу
export const searchFilm = (name) => {
    return dispatch => {
        dispatch(filmSearchStarted());

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=ceba97ac49cd1fc7fd02f8d60ae0df25&query=${name}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                if (result.results.length) {
                    dispatch(filmSearchSuccess(result.results))
                } else {
                    dispatch(filmSearchEmpty());
                }
            });
    }
}

//Поиск начался
const filmSearchStarted = () => ({
    type: FILM_SEARCH_STARTED
});

//Найдены фильмы
const filmSearchSuccess = (filmList) => ({
    type: FILM_SEARCH_SUCCESS,
    filmList: [
        ...filmList
    ]
});

//Поиск не дал результатов
const filmSearchEmpty = () => ({
    type: FILM_SEARCH_EMPTY
})

//Просмотр результатов поиска
export const openSearchList = () => ({
    type: OPEN_SEARCH_LIST
})

//Просмотр избранных
export const openFavoriteList = () => ({
    type: OPEN_FAVORITE_LIST
})

//Панель с информацие о фильме
export const openPanel = (filmId) => {
    return dispatch => {
        //Открываем панель
        dispatch(activePanel());
        
        //Получаем данные о фильме
        fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=ceba97ac49cd1fc7fd02f8d60ae0df25&language=ru-RU`)
			.then(response => {
				return response.json();
			}).then(result => {
                dispatch(getFilmInfo(result));
            });
        
        //Получаем данные о списке актеров
        fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=ceba97ac49cd1fc7fd02f8d60ae0df25`)
            .then(response => {
                return response.json();
            }).then( result => {
                dispatch(getFilmCast(result.cast))
            })
    }
};

//Открытие панели
const activePanel = () => ({
    type: OPEN_FILM_PANEL,
    filmPanel: {
        open: true,
    }
})

//Передаем полученную информацию о фильме
const getFilmInfo = (filmData) => ({
    type: GET_FILM_INFO,
    filmPanel: {
        filmData: filmData, 
    }
})

//Передаем полученную информацию о списке актеров
const getFilmCast = (filmCast) => ({
    type: GET_FILM_CAST,
    filmPanel: {
        filmCast: filmCast 
    }
})

//Закрытие панели
export const closePanel = () => ({
    type: CLOSE_FILM_PANEL,
    filmPanel: {
        open: false,
    }
})

//Добавление в избранное
export const addFavorite = (id) => {
    return (dispatch) => {
        let inList = true;
        let favoriteList = [...store.getState().favorites.favoriteList];

        //Проверка на нахождение фильма в списке
        favoriteList.map((film) => {
            if (film.id == id) inList = false;
        });

        if (inList) {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ceba97ac49cd1fc7fd02f8d60ae0df25&language=ru-RU`)
			.then(response => {
				return response.json();
			}).then(result => {
                dispatch(addFavoriteAction(result));
            });
        }
    }
}

const addFavoriteAction = (filmData) => ({
    type: ADD_FAVORITE,
    favorite: filmData,
})

//Удаление из избранного
export const deleteFavorite = (id) => {
    return (dispatch) => {
        let favoriteList = [...store.getState().favorites.favoriteList];
        let idPosition = -1;
        favoriteList.map(film => {
            if (film.id === id) {
                idPosition = favoriteList.indexOf(film);
                if (idPosition >= 0) favoriteList.splice(idPosition , 1);
            }
        });
        dispatch(deleteFavoriteAction(favoriteList));
    }
}

const deleteFavoriteAction = (favoriteList) => ({
    type: DELETE_FAVORITE,
    favoriteList: [...favoriteList]
})
