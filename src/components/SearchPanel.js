import React from "react";

class SearchPanel extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.enterValue(e.target.value);
	}

	render() {
		return (
			<header className="head-panel">
				<div className="head-panel__wrap">
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
						<i className="fas fa-search"></i>
						Искать
					</button>
				</div>
			</header>
		)
	}
}

export default SearchPanel;