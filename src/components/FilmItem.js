import React from 'react';

class FilmItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filmData: this.props.filmData
		};
		this.itemEvent = this.itemEvent.bind(this);
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
						alt="" />	
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
				</div>
		)
	}
}

export default FilmItem;