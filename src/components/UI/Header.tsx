import React, { Fragment } from "react";
import classes from './Header.module.css'
import PizzaLogo from '../../assets/pizza-svgrepo-com.svg'
import Cart from '../../assets/basket-fill.svg'
import { useQuery } from "@tanstack/react-query";
import { CartItemInterface, fetchCart } from "../../utils/https";

const Header:React.FC<{onClick: (event:React.MouseEvent) => void}> = (props) => {

    const {data, isPending, isError, error} = useQuery<CartItemInterface[]>({
        queryKey:['cart'],
        queryFn:fetchCart,
    });

    const totalQuantity = data?.reduce((sum:number,item:CartItemInterface) => sum + item.quantity, 0) || 0;

    

    return (
        <Fragment>
        <header className={classes.header}>
            <div className={classes.logoContainer}>
                <img src={PizzaLogo} alt='Pizza'/>
                <p>FastPizza</p>
            </div>
            <div className={classes.cartActionsSection}>
                <button onClick={props.onClick} className={classes.cartButton}>
                    <img src={Cart} alt='Cart'/>
                    <p>{totalQuantity}</p>
                </button>
            </div>
        </header>
        </Fragment>
    );
}

export default Header;