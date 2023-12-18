import React, { Fragment } from "react"
import classes from "./CartItem.module.css"
import CartItemCard from "../UI/CartItemCard";

const CartItem:React.FC<{quantity:number;name:string;price:number}> = (props) => {

  return (
    <Fragment>
      <CartItemCard>
        <div className={classes.cartDataContainer}>
          <div className={classes.nazwa}>{props.name}</div>
          <div className={classes.ilosc}>x{props.quantity}</div>
          <div className={classes.cena}>{props.price} zł</div>
        </div>
      </CartItemCard>
    </Fragment>
  );
}

export default CartItem;