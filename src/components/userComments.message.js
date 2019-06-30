import React from 'react';

const Message = ({username, image, text}) => {
    return (
        <li className="cf-message-container">
            <div className="cf-message">
                <div className="cf-avatar">
                    <img src={image} alt="user image"/>
                </div>
                <div className="cf-text-container">
                    <span className="cf-username">
                        {username}
                    </span>
                    <span className="cf-message-text">
                        {text}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default Message;
