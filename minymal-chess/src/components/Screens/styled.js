import styled from 'styled-components';

const StyledHome = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Redressed', serif;
    font-size: 1rem;
    @media (max-width: 415px) {
        justify-content: space-evenly;
    }
`;

export default StyledHome;
