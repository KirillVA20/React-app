import React from "react";

function AddFavorite(props) {

    let inFavouriteList = false;
    let addButton = document.querySelector(".js-in-queue");

    const inFavouriteHandler = () => {
        props.inFavourite(props.imdbID);
        inFavouriteList = !inFavouriteList;
        addButton.disabled = inFavouriteList;
    }

    return (
        <button className="film-info__in-queue js-in-queue"
                data-id={props.imdbID}
                onClick={inFavouriteHandler}
        >
            <i className="fas fa-heart"/>
        </button>
    )
}

export default AddFavorite;
