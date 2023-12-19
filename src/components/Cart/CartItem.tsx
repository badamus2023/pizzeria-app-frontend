import React, { Fragment } from "react"
import CartItemCard from "../UI/CartItemCard";
import { styled } from 'styled-components'

const CartItemDataContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-around;
`;

const CartItemName = styled.div`
  flex:1;
`;

const CartItemQuantity = styled.div`
  flex:1;
  text-align: center;
`

const CartItemPrice = styled.div`
  flex:1;
  text-align: right;
`;

const CartItem:React.FC<{quantity:number;name:string;price:number}> = (props) => {
  return (
    <Fragment>
      <CartItemCard>
        <CartItemDataContainer>
          <CartItemName>{props.name}</CartItemName>
          <CartItemQuantity>x{props.quantity}</CartItemQuantity>
          <CartItemPrice>{props.price} zł</CartItemPrice>
        </CartItemDataContainer>
      </CartItemCard>
    </Fragment>
  );
}

export default CartItem;