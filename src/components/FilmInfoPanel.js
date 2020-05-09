import React from "react";
import AddFavorite from "./ItemButtons/AddFavorite";

class FilmInfoPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			filmData: {},
		}
		this.closePanel = this.closePanel.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			open: nextProps.filmInfoPanel.open
		});

		let filmId = nextProps.filmInfoPanel.filmId;

		if (filmId) {
			fetch(`http://www.omdbapi.com/?apikey=de208628&i=${filmId}`)
			.then(response => {
				return response.json()
			}).then(result => {
				this.setState({
					filmData: result
				});
			});

			let favouriteList = nextProps.favourite.indexOf(filmId);

			if (+favouriteList > -1) {
				this.setState({
					inFavouriteList: true
				})
			} else {
				this.setState({
					inFavouriteList: false
				})
			}
		}
	}

	closePanel() {
		this.props.closeFilmPanel();
		this.setState({
			filmData: {}
		});
	}

	render() {
		const filmData = this.state.filmData;

		return (
			<div className={
					(this.state.open) ? "film-info film-info--open" : "film-info"
			}>
				<div className="film-info__wrap">
					<div className="film-info__close-panel">
						<button className="js-close-panel film-info__close-button"
								onClick={this.closePanel}
						>
							<i className="fas fa-chevron-left"/>
						</button>
					</div>
					<div className="film-info__left">
						<div className="film-info__poster">
							<img src={filmData.Poster}
								 alt={filmData.Title}
								 className="js-info-poster film-info__main-image"
							/>
						</div>
					</div>
					<div className="film-info__right">
						<div className="film-info__title">
							<h1 id="info-name" className="js-info-name film-info__name">
								{filmData.Title}
							</h1>
						</div>
						<div className="film-info__description">
							<div className="film-info__plot">
								<span id="film-info__plot" className="js-info-plot">
									{filmData.Plot}
								</span>
							</div>
							<div className="film-info__genre">
								<span id="js-info-genre film-info__genre"/>
							</div>
						</div>
					</div>
					<div className="film-info__button-panel">
						<AddFavorite
							imdbID={filmData.imdbID}
							inFavourite={this.props.inFavourite}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default FilmInfoPanel;
