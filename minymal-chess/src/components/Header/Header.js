import React from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, InfoBox } from './styled';

const Header = (props) => (
    <StyledHeader>
        <InfoBox id={'move-counter'}>
            <h2 className='h3'>{'Move'}</h2>
            <p className='h3'>{props.moveCount}</p>
        </InfoBox>
        <h1 id={'header'} style={{ textAlign: 'center', padding: '0.5rem' }}>{'Minimalist Chess'}</h1>
        <InfoBox id={'level-indicator'}>
            <h2 className='h3'>{'Level'}</h2>
            <p className='h3'>{`${props.level}`}</p>
        </InfoBox>
    </StyledHeader>
);

Header.propTypes = {
    moveCount: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired
};

export default Header;
