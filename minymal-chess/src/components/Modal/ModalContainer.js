import React from 'react';
import PropTypes from 'prop-types';
import Background from './styled';

const ModalContainer = (props) => (
    <Background>
        <div id={props.id} className='modal-dialog'>
            <div className='modal-content'>
                {props.children}
            </div>
        </div>
    </Background>
);

ModalContainer.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalContainer;
