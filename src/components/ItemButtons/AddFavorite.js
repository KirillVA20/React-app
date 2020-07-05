import React from "react";
import TitleElement from "../TitleElement/TitleElement";

const favoriteButton = {
    position: "relative",
    background: "none",
    border: "none",
    transition: "all .5s",
    cursor: "pointer",
    fontSize: "inherit",
}

class AddFavorite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inFavouriteList : false,
            hover: false
        }

        this.inFavouriteHandler = this.inFavouriteHandler.bind(this);
    }

    inFavouriteHandler() {
        this.props.inFavourite(this.props.id);
        this.setState({
            inFavouriteList: !this.state.inFavouriteList
        });
    }

    render () {
        const styleButton = {
            ...favoriteButton,
            color: this.state.hover ? "#FFA500" : "#1e1e1e"
        }

        return (
            <button onMouseEnter={() => this.setState({hover: true})}
                    onMouseLeave={() => this.setState({hover: false})}
                    className="film-info__in-queue"
                    data-id={this.props.id}
                    onClick={this.inFavouriteHandler}
                    style={styleButton}
                    disabled={this.state.inFavouriteList}
            >
                <TitleElement
                    titleText="В избранное"
                    hover={this.state.hover}
                />
                <i className="fas fa-heart"/>
            </button>
        )
    }

}

export default AddFavorite;
