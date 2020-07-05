import React from "react";
import DeleteFavorite from "./ItemButtons/DeleteFavorite";
import AddWatched from "./ItemButtons/AddWatched";
import Share from "./ItemButtons/Share";
import {connect} from 'react-redux';
import {openPanel, addFavorite} from '../store/actions';

class FavouriteItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmData: {}
        }
        this.buttonPanelFunc = this.buttonPanelFunc.bind(this);
    }

    componentDidMount() {
        this.setState({
            filmData : this.props.filmData,
        })
    }

    buttonPanelFunc(openList) {
        if (openList === "favorite") {
            return (
                <div className="favourite-item__button-panel">
                    <DeleteFavorite
                        outFavourite={this.props.outFavourite}
                        imdbID={this.state.filmData.id}
                    />
                    <AddWatched
                        filmWatched={this.props.filmWatched}
                        imdbID={this.state.filmData.id}
                    />
                    <Share />
                </div>
            )
        } else {
            return (
                <div className="favourite-item__button-panel">
                    <Share />
                </div>
            )
        }
    }

    render() {
        let filmData = this.state.filmData;
        const buttonPanel = this.buttonPanelFunc(this.props.openList);
        let backgroundImage = `https://image.tmdb.org/t/p/w500${filmData.poster_path}`;
        return (
            <div className="favourite-item">
                <div className="favourite-item__poster">
                    <img src={backgroundImage}
                         alt={filmData.Title}
                    />
                </div>
                <div className="favourite-item__info">
                    <h2 className="favourite-item__filmName">
                        {filmData.Title}
                    </h2>
                </div>
                {buttonPanel}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openFilmPanel: (filmId) => dispatch(openPanel(filmId)),
    }
}

export default connect(null,mapDispatchToProps)(FavouriteItem);
