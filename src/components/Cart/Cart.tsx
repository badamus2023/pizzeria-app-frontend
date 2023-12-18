import Checkout from "../Checkout/Checkout";
import CartData from "./CartData";
import { Fragment } from "react";

const Cart:React.FC<{onClose:(event:React.MouseEvent) => void}> = (props) => {

  let isCheckout:boolean = false;

  return (
    <Fragment>
      {isCheckout && <CartData onClose={props.onClose}/>}
      {<Checkout />}
    </Fragment>
  );
}

export default Cart;