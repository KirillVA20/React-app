import React from "react";
import TitleElement from "../TitleElement/TitleElement";

const watchedButton = {
    position: "relative",
    background: "none",
    border: "none",
    transition: "all .5s",
    cursor: "pointer",
    fontSize: "inherit",
}

class AddWatched extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }

        this.filmWatchedHandler = this.filmWatchedHandler.bind(this);
    }

    filmWatchedHandler() {
        this.props.filmWatched(this.props.id);
    }

    render () {

        const styleButton = {
            ...watchedButton,
            color: this.state.hover ? "#FFA500" : "#1e1e1e"
        }

        return (
            <button onMouseEnter={() => this.setState({hover: true})}
                    onMouseLeave={() => this.setState({hover: false})}
                    className="favourite-item__button"
                    onClick={this.filmWatchedHandler}
                    style={ styleButton }
            >
                <TitleElement
                    titleText="Просмотренно"
                    hover={this.state.hover}
                />
                <i className="fas fa-check" />
            </button>
        )
    }


}

export default AddWatched;
