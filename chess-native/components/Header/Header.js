import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
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

const PageHeader = styled.h1`
    text-align: center;
    padding: 0.5rem;
    font-weight: 400;
    margin: 0rem;
`;

const InfoBoxHeader = styled.h2`
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
    <Container>
        <InfoBox id={'move-counter'}>
            <InfoBoxHeader>{'Move'}</InfoBoxHeader>
            <InfoBoxValue>{props.moveCount}</InfoBoxValue>
        </InfoBox>
        <PageHeader id={'header'}>{'Minimalist Chess'}</PageHeader>
        <InfoBox id={'level-indicator'}>
            <InfoBoxHeader>{'Level'}</InfoBoxHeader>
            <InfoBoxValue>{`${props.level}`}</InfoBoxValue>
        </InfoBox>
    </Container>
);

Header.propTypes = {
    moveCount: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired
};

export default Header;
