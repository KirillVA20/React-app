import React from "react";

const title = {
    position: "absolute",
    background: "#FFA500",
    top: "0",
    left: "50%",
    right: "auto",
    transform: "translate(-50%, -100%)",
    padding: "5px 10px",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
    border: "3px",
    whiteSpace: "nowrap",
    transition: "all .5s"
}

class TitleElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: "title",
            hover: false,
        }
    }

    componentWillMount() {
        this.setState({
            titleText: this.props.titleText
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hover: nextProps.hover
        })
    }

    render() {
        const titleText = this.state.titleText;
        return(
            <div style={{
                    ...title,
                    opacity: this.state.hover ? "1" : "0"
                }}
            >
                <span>
                    {titleText}
                </span>
            </div>
        )
    }

}

export default TitleElement;
