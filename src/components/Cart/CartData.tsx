import React, { Fragment } from "react";
import CartItem from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import { CartItemInterface, fetchCart } from "../../utils/https";
import classes from "./Cart.module.css"

const CartData:React.FC<{onClose:(event:React.MouseEvent) => void}> = (props) => {

    const {data, isPending, isError, error} = useQuery<CartItemInterface[]>({
        queryKey: ['cart'],
        queryFn: fetchCart,
    });

    let content:React.ReactNode;

    if(data) {
      content = data.map((order:CartItemInterface) => 
        <CartItem key={order.id}
          name={order.name}
          quantity={order.quantity}
          price={order.price}
        />
      );
    };

    const totalPrice= data?.reduce((sum:number,item:CartItemInterface) => sum + item.price * item.quantity, 0) || 0;

    let isDataEmpty:boolean;

    if(data?.length === 0) {
        isDataEmpty = false;
    } else {
        isDataEmpty = true;
    }

    let isCheckout:boolean = false;


    
    
    return (
        <Fragment>
        <div className={classes.cartItemContainer}>{content}</div>
        <div className={classes.cartActions}>
          <div className={classes.buttons}>
            <button onClick={props.onClose} className={classes.button}>
              Zamknij
            </button>
            {isDataEmpty && <button className={classes.button}>Zamów</button>}
          </div>
          <div className={classes.kwota}>Łączna kwota: {totalPrice} zł</div>
        </div>
      </Fragment>
    );
}

export default CartData;