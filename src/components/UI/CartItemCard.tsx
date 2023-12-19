import classes from './CartItemCard.module.css'
import React from 'react';
import { styled } from 'styled-components'

const CartItemCardStyled = styled.div`
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    background-color: rgba(250, 165, 7, 0.836);
    width: 30rem;
    margin-top: 5px;
`;

interface CardProps {
    children?: React.ReactNode;
}


const CartItemCard:React.FC<CardProps> = (props) => {
    return (
        <CartItemCardStyled>{props.children}</CartItemCardStyled>
    );
}

export default CartItemCard;