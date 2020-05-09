import React from "react";
import FilmItem from "./FilmItem/FilmItem.js";
class FilmList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filmList: []
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.filmList) {
			this.setState({
				filmList: nextProps.filmList
			});
		}
	};

	render() {
		const filmList = this.state.filmList;
		const filmContainer = [];
		filmList.map((film, index) => {
			filmContainer.push(
				<FilmItem key={index}
						  filmData={film}
						  openFilmPanel={this.props.openFilmPanel}
						  filmWatched={this.props.filmWatched}
						  inFavourite={this.props.inFavourite}
				/>
			);
		});
		return (
			<main className="film-list">
				<div className="film-list__container js-film-list">
					{filmContainer}
				</div>
			</main>
		)
	}
}

export default FilmList;
