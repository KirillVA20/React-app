import React from "react";
import FavInformer from "./FavInformer";
import PersonalAvatar from "./PersonalAvatar";

class SearchPanel extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.enterValue(e.target.value);
	}

	render() {
		const favouriteLength = this.props.favourite.length;

		return (
			<header className="head-panel">
				<div className="head-panel__wrap">
					<div>
						<input type="text"
							   name="name"
							   className="head-panel__name-input js-film-name"
							   placeholder="Введите название фильма"
							   value={this.props.name}
							   onChange={this.handleChange}
						/>
						<button type="submit"
								onClick={this.props.searchFilm}
								name="submit"
								className="head-panel__submit button-style"
						>
							<i className="fas fa-search"/>
							Искать
						</button>
					</div>
					<div>
						{this.props.rating}
					</div>
					<FavInformer
						favouriteLength = {favouriteLength}
						openFavourite = {this.props.openFavourite}
					/>
					<PersonalAvatar
						openPersonal={this.props.openPersonal}
						personalAvatar={this.props.personalInfo.avatar}
					/>
				</div>
			</header>
		)
	}
}

export default SearchPanel;
