import React from "react";

class FavInformer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favouriteLength: 0
		};
		this.openFavouriteHandler = this.openFavouriteHandler.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			favouriteLength: nextProps.favouriteLength
		});
	}
	openFavouriteHandler() {
		this.props.openFavourite();
	}


	render() {
		const favouriteLength = this.state.favouriteLength;

		return(
			<div className="head-panel__fav-wrap">
				<button className="head-panel__fav-informer"
						onClick={this.openFavouriteHandler}>
					<span className="head-panel__fav-count">
						{favouriteLength}
					</span>
					<i className="fas fa-heart" />
				</button>
				<span className="head-panel__fav-msg">
				</span>
			</div>
		)
	}
}

export default FavInformer;
