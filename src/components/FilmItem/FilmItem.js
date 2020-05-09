import React from 'react';
import AddFavorite from "../ItemButtons/AddFavorite";
import AddWatched from "../ItemButtons/AddWatched";
import Share from "../ItemButtons/Share";

class FilmItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filmData:{}
		};
		this.itemEvent = this.itemEvent.bind(this);
	}

	componentWillMount() {
		this.setState({
			filmData: this.props.filmData
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filmData: nextProps.filmData
		});
	}



	itemEvent() {
		this.props.openFilmPanel(this.state.filmData.imdbID);
	}

	render() {
		const filmData = this.state.filmData;
		return (
				<div className="film-poster__container film-list__poster"
				 	 onClick={this.itemEvent}
				>
					<div className="film-poster__image">
						<img src={filmData.Poster}
							 alt=""
						/>
					</div>
					<div className="film-poster__info">
						<div className="film-poster__name">
							<span id="js-film-name">
								{filmData.Title}
							</span>
						</div>
						<div className="film-poster__year">
							<span id="js-film-year">
								{filmData.Year}
							</span>
						</div>
					</div>
					<div className="film-poster__button-panel">
						<AddFavorite
							imdbID={filmData.imdbID}
							inFavourite={this.props.inFavourite}
						/>
						<AddWatched
							filmWatched={this.props.filmWatched}
							imdbID={filmData.imdbID}
						/>
						<Share />
					</div>
				</div>
		)
	}
}

export default FilmItem;
