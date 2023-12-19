import { keyframes, styled } from 'styled-components'

interface LoaderProps {
    size?:string
}

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LoaderStyled = styled.span<LoaderProps>`
    width: ${(props) => props.size || '48px'};
    height: ${(props) => props.size || '48px'};
    border: 5px solid yellow;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
`;

const Loader:React.FC<LoaderProps> = (props) => {
  return <LoaderStyled {...props}></LoaderStyled>;
}

export default Loader;