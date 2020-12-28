import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    max-width: 60vh;
    padding: 0.5rem;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-basis: 0;
`;

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
