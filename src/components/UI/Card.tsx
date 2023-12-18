import classes from './Card.module.css'
import React from 'react';

interface CardProps {
    children?: React.ReactNode;
}

const Card:React.FC<CardProps> = (props) => {
    return (
        <div className={classes.card}>{props.children}</div>
    );
}

export default Card;