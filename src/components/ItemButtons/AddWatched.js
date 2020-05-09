import React from "react";

function AddWatched(props) {

    const filmWatchedHandler = () => {
        props.filmWatched(props.imdbID);
    }

    return (
        <button className="favourite-item__button"
                onClick={filmWatchedHandler}
        >
            <i className="fas fa-check" />
        </button>
    )
}

export default AddWatched;
