import React from "react";

function DeleteFavorite(props) {

        const outFavouriteHandler = () => {
            props.outFavourite(props.id);
        }

        return (
            <button className="favourite-item__button"
                    onClick={outFavouriteHandler}
            >
                <i className="fas fa-times" />
            </button>
        )
}

export default DeleteFavorite;
