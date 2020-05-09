import React from "react";

function PersonalAvatar(props) {
    const openPersonalHandler = () => {
        props.openPersonal();
        console.log(props);
    }

    return (
        <div className="personal-avatar">
            <img src={props.personalAvatar}
                 alt=""
                 className="personal-avatar__image"
                 onClick={openPersonalHandler}
            />
        </div>
    )
}

export default PersonalAvatar;
