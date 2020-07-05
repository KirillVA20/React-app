import React from "react";
import ArtistProfile from "./ArtistProfile";
import {Button, Col, Row, Tooltip, Tabs} from "antd";
import {CheckOutlined, HeartOutlined, ShareAltOutlined,CloseOutlined } from "@ant-design/icons";
import {connect} from 'react-redux';
import {closePanel} from '../../store/actions';

const {TabPane} = Tabs;

const infoPanel = {
	position: "fixed",
	top: "60px",
	right: "0",
	bottom: "0",
	width: "100%",
	background: "#f4f4f4",
	overflowY: "auto",
	transition: "all .5s",
	zIndex: "100"
}

const panelContainer = {
	marginLeft: "auto",
	marginRight: "auto",
	padding: "15px",
	display: "flex",
	justifyContent: "center",
	background: "#fff",
	zIndex: 10
}

const buttonPanel = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "15px",
	width: "50px",
	fontSize: "24px"
}

const imageContainer = {
	padding: "10px",
	width: "300px"
}

const poster = {
	boxShadow: "1px 2px 5px rgba(0,0,0,0.4)"
}

class FilmInfoPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const filmData = this.props.filmPanel.filmData;
		const genres = filmData.genres;
		const cast = this.props.filmPanel.filmCast;
		let backgroundImage = `https://image.tmdb.org/t/p/w500${filmData.poster_path}`;
		let backdrop = `url(https://image.tmdb.org/t/p/original${filmData.backdrop_path})`
		let genresList = [];
		let castList = []
		if (genres) {
			genres.forEach((genre, index) => {
				genresList.push(
					<span key={index}
					      style={{paddingLeft: "5px", cursor:"pointer"}}
					>
						{genre.name},
					</span>
				)
			})
		}


		if (cast) {
			cast.forEach((artist, index) => {
				castList.push(
					<ArtistProfile
						key={index}
						artist = {artist}
					/>
				)
			})
		}
		return (
			<div style={{
					...infoPanel,
					transform: this.props.filmPanel.open ? "translateX(0%)" : "translateX(100%)",

				}}
			>
				<div style={{height: "400px",
							 backgroundImage: backdrop,
							 position: "sticky",
							 top: "0px",
						     zIndex: "-1",
							backgroundSize: "cover",
							backgroundPosition: "center" ,
				}}>

				</div>
				<div style={panelContainer}>
					<div style={imageContainer}>
						<div className="film-info__poster">
							<img src={backgroundImage}
								 alt={filmData.Title}
								 className="js-info-poster film-info__main-image"
								 style={poster}
							/>
						</div>
					</div>
					<div className="film-info__right">
						<div className="film-info__title">
							<h1 id="info-name" className="js-info-name film-info__name">
								{filmData.original_title}
							</h1>
						</div>
						<Tabs defaultActiveKey={1}>
							<TabPane tab="Info" key="1">
								<div className="genres" >
								<span style = {{fontWeight: 600}}>
									Жанры :
								</span>
									<div>
										{
											genresList
										}
									</div>
								</div>
							</TabPane>
							<TabPane tab="Actors" key="2">
								<div style={{ maxHeight: "500px", overflow:"auto"}}>
									<h3 style = {{fontWeight: 600}}>
										Актеры :
									</h3>
									<Row style={{display: "flex"}}>
										{castList}
									</Row>
								</div>
							</TabPane>
							<TabPane tab="Description" key="3">
								<div className="film-info__description">
									<div className="film-info__plot">
								<span id="film-info__plot" className="js-info-plot">
									{filmData.overview}
								</span>
									</div>
									<div className="film-info__genre">
										<span id="js-info-genre film-info__genre"/>
									</div>
								</div>
							</TabPane>
						</Tabs>
					</div>
						<Row style={buttonPanel} gutter={15}>
								<Tooltip title="Close">
									<Button type="primary"
											shape="circle"
											icon={<CloseOutlined />}
											onClick = {() => this.props.closeFilmPanel()}
									/>
								</Tooltip>
								<Tooltip title="In watched">
									<Button 
											shape="circle"
											icon={<CheckOutlined />}
											onClick = {() => this.props.filmWatched(filmData.id)}
									/>
								</Tooltip>

								<Tooltip title="In favorite">
									<Button 
											shape="circle"
											icon={<HeartOutlined />}
											onClick = {() => this.props.inFavourite(filmData.id)}
									/>
								</Tooltip>

								<Tooltip title="Share">
									<Button 
											shape="circle"
											icon={<ShareAltOutlined />}
											onClick = {() => this.props.inFavourite(filmData.id)}
									/>
								</Tooltip>
						</Row>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state.filmPanel
}

const mapDispatchToProps = dispatch => {
	return {
		closeFilmPanel : () => dispatch(closePanel()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmInfoPanel);
