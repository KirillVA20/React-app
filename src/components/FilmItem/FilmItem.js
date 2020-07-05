import React from 'react';
import { Row, Col, Button, Tooltip } from 'antd';
import { HeartOutlined, CheckOutlined,ShareAltOutlined, AlignRightOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import {openPanel, addFavorite, deleteFavorite} from '../../store/actions';


const filmPoster = {
	display: "flex",
	flexDirection: "column",
	position: "relative",
	margin: "0 10px 20px 10px",
	width: "20%",
	borderRadius: "6px",
	transition: "all .5s",
}

const bottomPanel = {
	position: "relative",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	flexGrow: "1",
	borderBottomLeftRadius: "6px",
	borderBottomRightRadius: "6px",
	background: "rgb(255,255,255)",
}

const filmName = {
	fontWeight: "600",
	fontSize: "18px",
	paddingRight: "25px",
	color: "#1e1e1e"
}

let image = {
	position: "relative",
	textAlign: "center",
	width: "100%",
	height: "300px",
	cursor: "pointer",
	borderTopLeftRadius: "6px",
	borderTopRightRadius: "6px",
	backgroundPosition: "center",
	transition: "background-size .2s"
}

const info = {
	padding: "10px 10px 0px 10px",
}

const buttonPanel = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "10px 10px",
}

const hoverBack = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	left: "0",
	right: "0",
	top: "0",
	bottom: "0",
	color: "#fff",
	borderTopRightRadius: "inherit",
	borderTopLeftRadius: "inherit",
	fontSize: "24px",
	fontWeight: "600",
	background: "rgba(0,0,0, 0.4)",
	cursor: "pointer",
	transition: "all .5s"
}

const description = {
	position: "absolute",
	top: "0",
	bottom: "0",
	left: "0",
	right: "0",
	background: "#fff",
	borderRadius: "6px",
	zIndex: "2",
	padding: "10px",
	transition: "all .5s"
}

const descriptionTitle = {
	marginTop: "0",
	marginBottom: "10px"
}
const openDescriptionButton = {
	position: "absolute",
	top: "10px",
	right: "10px",
}

class FilmItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filmData:{},
			hover: false,
			itemType: "filmPoster",
			openDescription: false,
			descriptionHover: false,
		};
	}

	componentWillMount() {
		this.setState({
			filmData: this.props.filmData
		});
	}

	componentDidMount() {
		fetch(`http://www.omdbapi.com/?apikey=de208628&i=${this.state.filmData.id}`)
			.then(response => {
				return response.json();
			})
			.then(result => {
				this.setState({
					filmData: {
						...this.state.filmData,
						description: result.Plot
					}
				})
			})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filmData: nextProps.filmData
		});
	}

	render() {
		const filmData = this.state.filmData;
		const backgroundImage = this.state.filmData.poster_path;
		const openDescription = this.state.openDescription;
		const descriptionHover = this.state.descriptionHover;
		return (
				<Col xs={20} sm={10} md={6} lg={5} xl={4}
					 onMouseEnter={() => this.setState({hover : true})}
					 onMouseLeave={() => this.setState({hover : false})}
					 className="film-poster"
					 style={{
					 	...filmPoster,
						 boxShadow: this.state.hover
							 		? "0 0 20px rgba(0,0,0,0.6)"
							 		: "0 0 15px rgba(0,0,0,0.4)"
					 }}
				>
					<div style={{
							...description,
							visibility: openDescription ? "visible" : "hidden",
							opacity: openDescription ? "1" : "0"
						}}
					>
						<button onMouseEnter={() => this.setState({ descriptionHover : true})}
								onMouseLeave={() => this.setState({ descriptionHover : false})}
								onClick={() => this.setState({ openDescription: false })}
								style={{
									...openDescriptionButton,
									color: descriptionHover ? "#FFA500" : "#1e1e1e"
								}}
						>
							<i className="fas fa-times"/>
						</button>
						<h3 style={descriptionTitle}>
							Описание
						</h3>
						<span>
							{filmData.overview}
						</span>
					</div>
					<div style={{
								...image,
								backgroundImage: `url(https://image.tmdb.org/t/p/w300${backgroundImage})`,
								backgroundSize: this.state.hover ? '110%' : '100%'
					}}
						 className="film-poster__image"
						 onClick={() => {this.props.openFilmPanel(filmData.id)}}
					>
						<div className="film-poster__hover-back"
							 style={{
							 	...hoverBack,
								opacity: this.state.hover ? '1' : '0'
							 }}
						>
							Подробнее
						</div>
					</div>

					<div className="film-poster__bottom"
						 style={bottomPanel}
					>
						<Tooltip title="description">
							<Button onClick={() => this.setState({ openDescription: true })}
									shape="circle"
									icon={<AlignRightOutlined />}
									style={openDescriptionButton}
							>

							</Button>
						</Tooltip>
						<div className="film-poster__info"
							 style={info}
						>
							<div className="film-poster__name"
								 style={filmName}
							>
								<span id="js-film-name">
									  {filmData.original_title}
								</span>
							</div>
						</div>
						<div className="film-poster__button-panel"
							 style={buttonPanel}
						>
							<div className="film-poster__year">
								<span id="js-film-year">
									Год: {filmData.Year}
								</span>
							</div>
							<Row style = {{zIndex: "10", fontSize: "20px"}} gutter={8}>
								<Col span={8}>
									<Tooltip title="In watched">
										<Button type="primary"
												shape="circle"
												icon={<CheckOutlined />}
												onClick = {() => this.props.deleteFavorite(filmData.id)}
										/>
									</Tooltip>
								</Col>

								<Col span={8}>
									<Tooltip title="In favorite">
										<Button type="primary"
												shape="circle"
												icon={<HeartOutlined />}
												onClick = {() => this.props.addFavorite(filmData.id)}
										/>
									</Tooltip>
								</Col>

								<Col span={8}>
									<Tooltip title="Share">
										<Button type="primary"
												shape="circle"
												icon={<ShareAltOutlined />}
												onClick = {() => this.props.inFavourite(filmData.id)}
										/>
									</Tooltip>
								</Col>
							</Row>
						</div>
					</div>
				</Col>
		)
	}
}


const mapDispatchToProps = dispatch => {
	return {
		openFilmPanel: (filmId) => dispatch(openPanel(filmId)),
		addFavorite: (filmId) => dispatch(addFavorite(filmId)),
		deleteFavorite: (filmId) => dispatch(deleteFavorite(filmId)),
	}
}

export default connect(null,mapDispatchToProps)(FilmItem);
