import React from "react";
import SearchPanel from './SearchPanel.js';
import FilmList from './FilmList.js';
import FilmInfoPanel from './FilmInfoPanel.js';
import FavouritePanel from './FavouritePanel';
import PersonalPanel from "./PersonalPanel";
import '../styles/App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'Batman',
			filmList: [],
			filmInfoPanel: {
				open: false,
				filmId: ""
			},
			favourite: [],
			favouritePanelOpen: false,
			watchedFilms: [],
			rating: 0,
			openPersonalPanel: true,
			personalInfo: {
				avatar: "../images/Mario.jpg",
				name: "Kirill",
				favoritesJenre: ["fantastic"],
				favoritesFilm: ["Birdman"]
			}
		};

		this.searchFilm = this.searchFilm.bind(this);
		this.enterValue = this.enterValue.bind(this);
		this.openFilmPanel = this.openFilmPanel.bind(this);
		this.closeFilmPanel = this.closeFilmPanel.bind(this);
		this.inFavourite = this.inFavourite.bind(this);
		this.openFavourite = this.openFavourite.bind(this);
		this.outFavourite = this.outFavourite.bind(this);
		this.filmWatched = this.filmWatched.bind(this);
		this.openPersonal = this.openPersonal.bind(this);
		this.changeAvatar = this.changeAvatar.bind(this);
	}

	searchFilm(e) {
		e.preventDefault();
		let searchMethod = fetch(`http://www.omdbapi.com/?apikey=de208628&s=${this.state.name}`)
		searchMethod.then(response => {
			return response.json();
		}).then(result => {
			this.setState({
				filmList: result
			});
		});
	}

	enterValue(name) {
		this.setState({
			name: name
		})
	}

	openFilmPanel(filmId) {
		this.setState({
			filmInfoPanel : {
				open: true,
				filmId
			}
		});
	}

	closeFilmPanel() {
		this.setState({
			filmInfoPanel : {
				open: false,
				filmId: ""
			}
		});
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
		console.log(filePath)
		this.setState({
			personalInfo : {
				...this.state.personalInfo,
				avatar: `../images/${filePath.name}`,
			}
		})
	}

	render() {
		const name = this.state.name;
		const favourite = this.state.favourite;
		const favouritePanelOpen = this.state.favouritePanelOpen;
		const filmList = this.state.filmList.Search;
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
					name={name}
					enterValue={this.enterValue}
					searchFilm={this.searchFilm}
					favourite={favourite}
					openFavourite={openFavourite}
					rating={rating}
					openPersonal={openPersonal}
					personalInfo={personalInfo}
				/>
				<FilmList
					filmList={filmList}
					openFilmPanel={this.openFilmPanel}
					filmWatched={filmWatched}
					inFavourite={this.inFavourite}
				/>
				<FilmInfoPanel
					filmInfoPanel = {this.state.filmInfoPanel}
					closeFilmPanel={this.closeFilmPanel}
					inFavourite={this.inFavourite}
					favourite={favourite}
				/>
				<FavouritePanel
					favouritePanelOpen = {favouritePanelOpen}
					favourite = {favourite}
					outFavourite = {outFavourite}
					filmWatched = {filmWatched}
					watchedFilms = {watchedFilms}
				/>
				<PersonalPanel
					personalInfo={personalInfo}
					openPersonalPanel={openPersonalPanel}
					changeAvatar={changeAvatar}
				/>
			</div>
		)
	}
}

export default App;
