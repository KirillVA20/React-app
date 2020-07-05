import React from "react";

class Rating extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = `rating__background rating__background--${this.props.rating}`;
        return (
            <div className="rating">
                <span className="rating__number">
                    {this.props.rating}
                    <span className={className} />
                </span>
            </div>
        )
    }
}

export default Rating;
