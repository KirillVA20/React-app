import React from "react";
import FilmItem from "./FilmItem.js";
class FilmList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filmList: []
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filmList: nextProps.filmList
		});
	};

	render() {
		const filmList = this.state.filmList;
		const filmContainer = [];
		filmList.map((film, index) => {
			filmContainer.push(
				<FilmItem key={index} 
						  filmData={film} 
						  openFilmPanel={this.props.openFilmPanel} 
				/>
			);
		})
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