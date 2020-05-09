import React from "react";

class PersonalPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalInfo: {}
        }
        this.changeAvatarHandler = this.changeAvatarHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
           personalInfo: this.props.personalInfo
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            personalInfo: nextProps.personalInfo
        })
    }

    changeAvatarHandler(e) {
        this.props.changeAvatar(e.target.files[0]);
    }

    render() {
        const panelCls = (this.props.openPersonalPanel)
            ? "personal-panel personal-panel--active"
            : "personal-panel";
        const personalInfo = this.state.personalInfo;


        return(
            <div className={panelCls}>
                <div className="personal-panel__avatar">
                    <img src={personalInfo.avatar} alt="" className="personal-panel__image"/>
                    <input className="personal-panel__new-avatar"
                           type="file"
                           onChange={this.changeAvatarHandler}
                    />
                </div>
                <div className="personal-panel__info">
                    <h2 className="personal-panel__name">
                        {personalInfo.name}
                    </h2>
                </div>
            </div>
        )
    }
}

export default PersonalPanel;
