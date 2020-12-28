import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledHeader, InfoBox } from './styled';

const AppHeading = styled.h1`
    text-align: center;
    padding: 0.5rem;
    font-weight: 400;
    margin: 0rem;
`;

const InfoBoxHeading = styled.h2`
    font-size: 1.5em;
    margin: 0rem;
    font-weight: 400;
`;

const InfoBoxValue = styled.p`
    font-size: 1.5em;
    margin: 0.5rem;
    font-weight: 400;
`;

const Header = (props) => (
    <StyledHeader>
        <InfoBox id={'move-counter'}>
            <InfoBoxHeading>{'Move'}</InfoBoxHeading>
            <InfoBoxValue>{props.moveCount}</InfoBoxValue>
        </InfoBox>
        <AppHeading id={'header'}>{'Minimalist Chess'}</AppHeading>
        <InfoBox id={'level-indicator'}>
            <InfoBoxHeading>{'Level'}</InfoBoxHeading>
            <InfoBoxValue>{`${props.level}`}</InfoBoxValue>
        </InfoBox>
    </StyledHeader>
);

Header.propTypes = {
    moveCount: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired
};

export default Header;
