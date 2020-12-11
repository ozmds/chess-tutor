import React from 'react';
import PropTypes from 'prop-types';

const ModalOption = (props) => (
    <button
        type='button'
        className={`m-3 border btn btn-lg ${props.backgroundColour} ${props.selected ? 'active shadow' : ''}`}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

ModalOption.propTypes = {
    backgroundColour: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalOption;
