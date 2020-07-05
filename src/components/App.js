import React from "react";
import SearchPanel from './SearchPanel.js';
import FilmList from './FilmList.js';
import FilmInfoPanel from './FilmInfoPanel/FilmInfoPanel.js';
import FavouritePanel from './FavouritePanel';
import PersonalPanel from "./PersonalPanel";
import '../styles/App.css';
import 'antd/dist/antd.css';
import {connect} from "react-redux";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filmList: [],
			filmInfoPanel: {
				open: false,
				filmId: ""
			},
			favouriteList: [],
			favouritePanelOpen: false,
			watchedFilms: [],
			rating: 0,
			openPersonalPanel: false,
			personalInfo: {
				avatar: "../images/Mario.jpg",
				name: "Kirill",
				favoritesJenre: ["fantastic"],
				favoritesFilm: ["Birdman"]
			},
		};

		this.inFavourite = this.inFavourite.bind(this);
		this.openFavourite = this.openFavourite.bind(this);
		this.outFavourite = this.outFavourite.bind(this);
		this.filmWatched = this.filmWatched.bind(this);
		this.openPersonal = this.openPersonal.bind(this);
		this.changeAvatar = this.changeAvatar.bind(this);
	}

	inFavourite(filmId) {
		const {favourite} = this.state;
		favourite.push(filmId);
		this.setState({
			favourite: favourite
		});
	}

	outFavourite(filmId) {
		const favourite = this.state.favourite.filter( film => film !== filmId );
		this.setState({
			favourite: favourite
		});
	}

	openFavourite() {
		this.setState({
			favouritePanelOpen: !this.state.favouritePanelOpen,
		});
	}

	filmWatched(filmId) {
		this.outFavourite(filmId);
		let personalRating = this.state.rating;
		let personalWatchedFilms = this.state.watchedFilms;
		personalWatchedFilms.push(filmId);
		personalRating = personalRating + 10;
		this.setState({
			rating: personalRating,
			watchedFilms: personalWatchedFilms
		});
	}

	openPersonal() {
		this.setState({
			openPersonalPanel: !this.state.openPersonalPanel
		})
	}

	changeAvatar(filePath) {
		this.setState({
			personalInfo : {
				...this.state.personalInfo,
				avatar: `../images/${filePath.name}`,
			}
		})
	}

	render() {
		const favourite = this.state.favourite;
		const favouritePanelOpen = this.state.favouritePanelOpen;
		const filmList = this.state.filmList;
		const openFavourite = this.openFavourite;
		const outFavourite = this.outFavourite;
		const filmWatched = this.filmWatched;
		const watchedFilms = this.state.watchedFilms;
		const rating = this.state.rating;
		const openPersonal = this.openPersonal;
		const personalInfo = this.state.personalInfo;
		const openPersonalPanel = this.state.openPersonalPanel;
		const changeAvatar = this.changeAvatar;

		return (
			<div className="container">
				<SearchPanel
					favourite={favourite}
					openFavourite={openFavourite}
					rating={rating}
					openPersonal={openPersonal}
					personalInfo={personalInfo}
				/>
				<FilmList
					filmList={filmList}
					filmWatched={filmWatched}
					inFavourite={this.inFavourite}
				/>
				<FilmInfoPanel
					filmInfoPanel = {this.state.filmInfoPanel}
					inFavourite={this.inFavourite}
					favourite={favourite}
				/>
				{/* <FavouritePanel
					favouritePanelOpen = {favouritePanelOpen}
					favourite = {favourite}
					outFavourite = {outFavourite}
					filmWatched = {filmWatched}
					watchedFilms = {watchedFilms}
				/> */}
				<PersonalPanel
					personalInfo={personalInfo}
					openPersonalPanel={openPersonalPanel}
					changeAvatar={changeAvatar}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { 
		favorites: state.favorites.favouriteList,
	}
}

export default connect(mapStateToProps)(App);
