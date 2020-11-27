import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 80%;
    max-width: 60vh;
    min-width: 35rem;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-basis: 0;
`;

const getMoveCountFromFen = (fen) => parseInt(fen.split(' ')[5], 10);

const Header = (props) => (
    <StyledHeader>
        <InfoBox>
            <h3>{'Move'}</h3>
            <h3>{getMoveCountFromFen(props.fen)}</h3>
        </InfoBox>
        <h1>{'Minimalist Chess'}</h1>
        <InfoBox>
            <h3>{'Level'}</h3>
            <h3>{`${props.level}`}</h3>
        </InfoBox>
    </StyledHeader>
);

Header.propTypes = {
    fen: PropTypes.string,
    level: PropTypes.number
};

export default Header;
