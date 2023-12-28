import React, { Fragment } from "react";
import CartItem from "./CartItem";
import { styled } from 'styled-components'
import { useQuery } from "@tanstack/react-query";
import { CartItemInterface, fetchCart } from "../../utils/https";

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
`;

const CartButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const CartButton = styled.button`
  border: none;
  width: 5rem;
  height: 2rem;
  border-radius: 15px;
  background-color: orange;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  font-weight: bold;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const CartTotalPrice = styled.p`
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const CartData:React.FC<{onClose:(event:React.MouseEvent) => void; onStartCheckout:(event:React.MouseEvent) => void;}> = (props) => {
  const { data } = useQuery<CartItemInterface[]>({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  let content: React.ReactNode;

  if (data) {
    content = data.map((order: CartItemInterface) => (
      <CartItem
        key={order.id}
        name={order.name}
        quantity={order.quantity}
        price={order.price}
      />
    ));
  }

  const totalPrice =
    data?.reduce(
      (sum: number, item: CartItemInterface) =>
        sum + item.price * item.quantity,
      0
    ) || 0;

  let isDataEmpty: boolean;

  if (!data || data.length === 0) {
    isDataEmpty = false;
  } else {
    isDataEmpty = true;
  }

  return (
    <Fragment>
      <CartItemContainer>{content}</CartItemContainer>
      <CartFooter>
        <CartButtons>
          <CartButton onClick={props.onClose}>Zamknij</CartButton>
          {isDataEmpty && (
            <CartButton onClick={props.onStartCheckout}>Zamów</CartButton>
          )}
        </CartButtons>
        <CartTotalPrice>Łączna kwota: {totalPrice} zł</CartTotalPrice>
      </CartFooter>
    </Fragment>
  );
}

export default CartData;