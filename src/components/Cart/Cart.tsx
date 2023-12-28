import Checkout from "../Checkout/Checkout";
import CartData from "./CartData";
import { Fragment, useState } from "react";

const Cart:React.FC<{onClose:(event:React.MouseEvent) => void}> = (props) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  const stopCheckoutHandler = (): void => {
    setIsCheckout(false);
  };

  const startCheckoutHandler = (): void => {
    setIsCheckout(true);
  };

  return (
    <Fragment>
      {!isCheckout && (
        <CartData
          onStartCheckout={startCheckoutHandler}
          onClose={props.onClose}
        />
      )}
      {isCheckout && (
        <Checkout
          onGoBack={stopCheckoutHandler}
          onSubmit={stopCheckoutHandler}
        />
      )}
    </Fragment>
  );
}

export default Cart;