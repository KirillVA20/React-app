import React from "react";
import TitleElement from "../TitleElement/TitleElement";

const favoriteButtonPoster = {
    position: "relative",
    background: "none",
    border: "none",
    transition: "all .5s",
    cursor: "pointer",
    fontSize: "inherit",
}

class Share extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    render() {
        return (
            <button onMouseEnter={() => this.setState({hover: true})}
                    onMouseLeave={() => this.setState({hover: false})}
                    style={{
                        ...favoriteButtonPoster,
                        color: this.state.hover ? "#FFA500" : "#1e1e1e"
                    }}

            >
                <TitleElement
                    titleText="Поделиться"
                    hover={this.state.hover}
                />
                <i className="fas fa-share"/>
            </button>
        )
    }

}

export default Share;
