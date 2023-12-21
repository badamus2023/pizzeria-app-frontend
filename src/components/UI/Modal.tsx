import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { keyframes, styled } from 'styled-components';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalStyled = styled.div`
  position: fixed;
  top: 15vh;
  left: calc(50% - 20rem);
  width: 40rem;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: ${slideDown} 300ms ease-out forwards;

  @media (max-width: 768px) {
    width: 20rem;
    left: calc(50% - 11rem)
  }
`;


type BackdropProps = {
    onClose: () => void;
}

const Backdrop:React.FC<BackdropProps> = (props) => {
  return <BackdropStyled onClick={props.onClose}/>;
};

type ModalOverlayProps = {
    children: React.ReactNode;
}

const ModalOverlay:React.FC<ModalOverlayProps> = (props) => {
  return (
    <ModalStyled>
      <div>{props.children}</div>
    </ModalStyled>
  );
};

const portalElement = document.getElementById('overlays');

type ModalProps=  {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal:React.FC<ModalProps> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement!)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement!)}
    </Fragment>
  );
};

export default Modal;
