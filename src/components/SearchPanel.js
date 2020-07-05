import React from "react";
import FavInformer from "./FavInformer";
import PersonalAvatar from "./PersonalAvatar";
import Rating from "./Rating/Rating";
import {Button, Input} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import {searchFilm} from "../store/actions";

const { Search } = Input;

class SearchPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	render() {
		//const favouriteLength = this.props.favourite.length;

		return (
			<header className="head-panel">
				<div className="head-panel__wrap">
					<div className="head-panel__left">
						<Search placeholder="input search text"
								onSearch={value => this.props.searchFilm(value)}
								enterButton = "Search"
								size="large"
						/>
					</div>
					<div className="head-panel__right">
						<FavInformer
							//favouriteLength = {favouriteLength}
							openFavourite = {this.props.openFavourite}
						/>
						<Rating
							rating={this.props.rating}
						/>
						<PersonalAvatar
							openPersonal={this.props.openPersonal}
							personalAvatar={this.props.personalInfo.avatar}
						/>
					</div>
				</div>
			</header>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		searchFilm: (name) => dispatch(searchFilm(name))
	}
}


export default connect(null, mapDispatchToProps)(SearchPanel);
