import React from 'react';
import {Col} from "antd";

class ArtistProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
    render () {
        const artist = this.props.artist;
        const artistImage = `https://image.tmdb.org/t/p/w200${artist.profile_path}`;
        return (
            <Col span={5}
                style={{
                    minWidth: "150px",
                    maxWidth: "150x",
                    height: "250px",
                    marginRight: "10px",
                    transition: "all .5s",
                    cursor: "pointer",
                    boxShadow: (this.state.hover) ? "1px 1px 5px rgba(0,0,0,0.2)" : "0px 0px 0px rgba(0,0,0,0)"
                }}
                 onMouseEnter={() => this.setState({ hover : true})}
                 onMouseLeave={() => this.setState({ hover : false})}
            >
                <img src={artistImage}
                     alt=""
                     width="110px"
                     height="150px"
                     style={{
                         objectFit:"cover",
                         width: "100%",
                         borderTopLeftRadius: "6px",
                         borderTopRightRadius: "6px",
                     }}
                />
                <div style={{
                            marginTop: "-5px",
                            background: "#fff",
                            padding: "10px",
                            borderBottomLeftRadius: "6px",
                            borderBottomRightRadius: "6px"
                            }}>
                    <span>
                        { artist.character }
                    </span>
                    <span>
                        { artist.name }
                    </span>
                </div>
            </Col>
        )
    }
}

export default ArtistProfile;
