import React from "react";
import SearchPanel from './SearchPanel.js';
import FilmList from './FilmList.js';
import FilmInfoPanel from './FilmInfoPanel.js';

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
			}
		};

		this.searchFilm = this.searchFilm.bind(this);
		this.enterValue = this.enterValue.bind(this);
		this.openFilmPanel = this.openFilmPanel.bind(this);
		this.closeFilmPanel = this.closeFilmPanel.bind(this);
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
 
	render() {
		const name = this.state.name;
		const filmList = this.state.filmList.Search;
		return (
			<div className="container">
				<SearchPanel 
					name={name}
					enterValue={this.enterValue}
					searchFilm={this.searchFilm}
				/>
				<FilmList 
					filmList={filmList}
					openFilmPanel={this.openFilmPanel}
				/>
				<FilmInfoPanel 
					filmInfoPanel = {this.state.filmInfoPanel}
					closeFilmPanel={this.closeFilmPanel}
				/>
			</div>
		)
	}
}

export default App;
