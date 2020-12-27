import styled from 'styled-components';
import isLightTile from './scripts/isLightTile';

export const StyledSquare = styled.div`
    width: 12.5%;
    height: 12.5%;
    position: relative;
    background-color: ${(props) => (isLightTile(props.id) ? 'cornsilk' : '#b5721d')};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ChessPiece = styled.img`
    width: 70%;
    position: relative;
    z-index: 2;
`;

export const TargetCircle = styled.img`
    position: absolute;
    width: 100%;
    z-index: 1;
`;
