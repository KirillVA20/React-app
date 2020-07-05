import React from "react";
import TitleElement from "../TitleElement/TitleElement";

const button = {
    position: "relative",
    background: "none",
    border: "none",
    transition: "all .5s",
    cursor: "pointer",
    fontSize: "inherit",
}

class CloseInfoPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }

    render() {
        return (
            <button onMouseEnter={() => this.setState({hover : true})}
                    onMouseLeave={() => this.setState({hover : false})}
                    onClick={this.props.closePanel}
                    style={button}
            >
                <i className="fas fa-times"/>
                <TitleElement
                    titleText="Закрыть"
                    hover={this.state.hover}
                />
            </button>
        )
    }
}

export default CloseInfoPanel;
