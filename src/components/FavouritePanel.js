import React from "react";
import FavouriteItem from "./FavouriteItem.js";

class FavouritePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteList: [],
            watchedList: [],
            openList: "favorite"
        }

        this._getFilmData = this._getFilmData.bind(this);
        this.openListFunc = this.openListFunc.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            favouriteList: [],
            watchedList: [],
        });

        nextProps.favourite.forEach( filmid => this._getFilmData(filmid, "favourite"));
        nextProps.watchedFilms.forEach( filmId => this._getFilmData(filmId, "watched"))
    }

    _getFilmData(filmId, list) {
        fetch(`http://www.omdbapi.com/?apikey=de208628&i=${filmId}`)
            .then(resolve => {
                return resolve.json();
            })
            .then(result => {
                if (list === "favourite") {
                    let favList = this.state.favouriteList;
                    favList.push(result);
                    this.setState({
                        favouriteList : favList
                    })
                } else {
                    let watchedList = this.state.watchedList;
                    watchedList.push(result);
                    this.setState({
                        watchedList : watchedList
                    })
                }

            })
    }

    openListFunc(e) {
        this.setState({
            openList: e.target.dataset.list
        });
    }

    render() {
        let informerPanelCls = (this.props.favouritePanelOpen)
                                ? "favourite-panel favourite-panel--open"
                                : "favourite-panel";
        const outFavourite = this.props.outFavourite;
        const filmWatched = this.props.filmWatched;

        let itemList  = (this.state.openList === "favorite")
                        ?  this.state.favouriteList
                        :  this.state.watchedList;
        let itemContainer = [];

        if (itemList.length) {
            itemList.map( (filmData,key) => {
                itemContainer.push(
                    <FavouriteItem
                        key = {key}
                        filmData = {filmData}
                        outFavourite = {outFavourite}
                        filmWatched = {filmWatched}
                        openList = {this.state.openList}
                    />
                )
            })
        } else {
            itemContainer = <h1>Ничего нет(</h1>
        }

        const openListFunc = this.openListFunc;

        return (
            <div className={informerPanelCls}>
                <div className="favourite-panel__tabs">
                    <button className="favourite-panel__tab"
                            data-list="favorite"
                            onClick={openListFunc}
                    >
                        Избранное
                    </button>
                    <button className="favourite-panel__tab"
                            data-list="watched"
                            onClick={openListFunc}
                    >
                        Посмотренные
                    </button>
                </div>
                <div className="favourite-panel__wrap">
                    {itemContainer}
                </div>
            </div>

        )
    }
}

export default FavouritePanel;
