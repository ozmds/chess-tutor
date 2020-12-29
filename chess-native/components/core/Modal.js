import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, TransparentButton } from './Button';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    flex-wrap: wrap;
`;

const Background = styled.div`
    position: fixed;
    z-index: 1050;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Header = styled.h2`
    margin: 0rem;
    font-weight: 400;
`;

const Body = styled(Container)`
    border-top: 0.125rem solid rgba(0, 0, 0, 0.3);
    border-bottom: 0.125rem solid rgba(0, 0, 0, 0.3);
    font-size: 1.2rem;
`;

const Footer = styled(Container)`
    justify-content: flex-end;
`;

const Window = styled.div`
    width: 90vw;
    max-width: 40rem;
    padding: 0.5rem;
    background-color: #FFF;
    box-shadow: 1rem;
`;

const Modal = (props) => (
    <Background>
        <Window id={props.id}>
            <Container>
                <Header>{props.header}</Header>
                <TransparentButton colour={'#A8B0D1'} onClick={props.onClose}>
                    <Header>{'X'}</Header>
                </TransparentButton>
            </Container>
            <Body id={'modal-body'}>
                {props.children}
            </Body>
            <Footer>
                <Button colour={'#A8B0D1'} id={'modal-action'} onClick={props.action}>
                    {props.actionText}
                </Button>
            </Footer>
        </Window>
    </Background>
);

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;
