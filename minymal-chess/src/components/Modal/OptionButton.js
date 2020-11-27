import React from 'react';
import PropTypes from 'prop-types';

const OptionButton = (props) => (
    <button
        type='button'
        className={`m-3 border btn btn-lg ${props.colour} ${props.selected ? 'active shadow' : ''}`}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

OptionButton.propTypes = {
    onClick: PropTypes.func,
    colour: PropTypes.string,
    children: PropTypes.node,
    selected: PropTypes.bool
};

export default OptionButton;
