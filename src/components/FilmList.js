import React from "react";
import FilmItem from "./FilmItem/FilmItem.js";
import { Row, Col, Badge, Button} from 'antd';
import {connect} from 'react-redux';
import {openFavoriteList, openSearchList} from '../store/actions/index.js';

function FilmList(props) {
	let filmContainer = '';
	let filmList = [];

	//Рендер фильмов
	const renderFilmsItem = (filmList) => {
		const filmContainer = [];
		filmList.map((film, index) => {
			filmContainer.push(
				<FilmItem key={index}
						  filmData={film}
						  openFilmPanel={props.openFilmPanel}
						  filmWatched={props.filmWatched}
						  inFavourite={props.inFavourite}
				/>
			);
		});
		return filmContainer;
	}

	//Получаем категорию списка фильмов
	const getFilmList = () => {
		switch (props.openList) {
			case 'search' :
				filmList = [...props.filmList];
				break;
			case 'favorites' : 
				filmList = [...props.favorites];
				break;
			case 'watched' : 
				filmList = [...props.filmList];
				break;
		}
	}

	//Вывод контента в списке
	const getStatus = () => {
		switch (props.status) {
			//Поиск не начался
			case 'none' :
				filmContainer = 'Начните поиск';
				break;
			//Поиск начался
			case 'search' : 
				filmContainer = 'Поиск...';
				break;
			//Поиск завершился удачно
			case 'success' :
				getFilmList();
				filmContainer = renderFilmsItem(filmList);
				break;
			//Поиск не выдал результата
			case 'empty' : 
				filmContainer = 'Пусто';
				break;
		}
	}

	getStatus();

	return (
		//Контент с фильмами
		<main className="film-list">
			{/* Панель с кнопками */}
			<Row span={12} 
				 justify="center" 
				 style={{marginBottom: 20}}
			>
				<Col offset={1}>
					<Badge count={props.filmList.length}>
						<Button type="primary" onClick={() => {props.openSearchList()}}>
							Поиск
						</Button>
					</Badge>
				</Col>
				<Col offset={1}>
					<Badge count={props.favorites.length}>
						<Button onClick={() => {props.openFavoriteList()}}>
							Избранное
						</Button>
					</Badge>
				</Col>
				<Col offset={1}>
					<Badge count={0}>
						<Button>
							Просмотренные
						</Button>
					</Badge>
				</Col>
			</Row>
			<Row className="film-list__container js-film-list"
				span={24}
			>
				{filmContainer}
			</Row>
		</main>
	)
}

//Получаем список фильмов с хранилища
const mapStateToProps = state => {
	const {filmList,favorites} = state;
	return { 
		status: filmList.status,
		filmList: [...filmList.filmList],
		openList: filmList.openList,
		favorites: [...favorites.favoriteList] 
	};
}

const mapDispatchToProps = dispatch => {
	return {
		openSearchList: () => dispatch(openSearchList()),
		openFavoriteList: () => dispatch(openFavoriteList()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmList);
