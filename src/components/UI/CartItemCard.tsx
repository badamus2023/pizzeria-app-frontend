import classes from './CartItemCard.module.css'
import React from 'react';

interface CardProps {
    children?: React.ReactNode;
}

const CartItemCard:React.FC<CardProps> = (props) => {
    return (
        <div className={classes.card}>{props.children}</div>
    );
}

export default CartItemCard;