import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ content, className }) => {
    return (
        <div className={ className }>
            <p className="content">{ content }</p>
        </div>
    );
};

Message.propTypes = {
    props: PropTypes.shape({
        content: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired
    })
};

export default Message;

