import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../core/Button';

const ModalOption = (props) => (
    <Button
        id={props.id}
        type='button'
        onClick={props.onClick}
        colour={'#A8B0D1'}
    >
        {props.children}
    </Button>
);

ModalOption.propTypes = {
    id: PropTypes.string.isRequired,
    backgroundColour: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalOption;
