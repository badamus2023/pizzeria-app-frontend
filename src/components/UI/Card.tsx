import React from 'react';
import {styled} from 'styled-components'

const CardSyled = styled.div`
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    background-color: white;
    width: 30rem;
    margin-top: 5px;
`;

interface CardProps {
    children?: React.ReactNode;
}

const Card:React.FC<CardProps> = (props) => {
    return (
        <CardSyled>{props.children}</CardSyled>
    );
}

export default Card;