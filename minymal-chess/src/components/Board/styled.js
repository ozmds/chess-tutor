import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';

export const StyledBoardSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

export const StyledSquare = styled.div`
    position: relative;
    width: 100%;
    max-width: 60vh;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: #696969;
    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

export const StyledFlipper = styled(Flipper)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.75rem;
    flex-wrap: wrap;
    @media (max-width: 415px) {
        padding: 0rem;
    }
`;
