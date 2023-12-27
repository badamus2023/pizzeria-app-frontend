import React from "react";
import Card from "../UI/Card";
import trash from "../../assets/trash.svg"
import { useMutation } from "@tanstack/react-query";
import { addPizzaToCart, deletePizza, queryClient, removePizzaFromCart } from "../../utils/https";
import { styled } from 'styled-components';
import { toast } from "react-toastify";
import Loader from "../UI/Loader";

const Meal = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
`;

const MealH3 = styled.h3`
    margin: 0 0 0.25rem 0;
`;

const MealDescription = styled.div`
    font-style: italic;
`;

const MealPrice = styled.div`
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
`;

const MealActionsButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const MealButton = styled.button`
    width: 2rem;
    height: 2rem;
    font-size: 25px;
    background-color: white;
    border-radius: 10px;

    &:hover {
        opacity: 0.3;
        cursor: pointer;
    }
`;

const PizzaItem:React.FC<{name:string, description:string, price:number, id:number}> = (props) => {
  const { mutate, isPending: isPizzaDeletePending } = useMutation({
    mutationFn: deletePizza,
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
    onError: (): void => {
      toast.error(`Couldnt delete the pizza from the menu`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const { mutate: addPizza, isPending: isAddPizzaToCartPending } = useMutation({
    mutationFn: addPizzaToCart,
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (): void => {
      toast.error(`Couldnt add the pizza to the cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const { mutate: removePizza, isPending: isPizzaRemoving } = useMutation({
    mutationFn: removePizzaFromCart,
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (): void => {
      toast.error(`Couldnt remove the pizza from cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const removePizzaHandler = (): void => {
    removePizza({ id: props.id });
  };

  const addPizzaToCartHandler = (): void => {
    addPizza({ id: props.id });
  };

  const deletePizzaHandler = (): void => {
    mutate({ id: props.id });
  };

  return (
    <Card>
      <Meal>
        <div>
          <MealH3>{props.name}</MealH3>
          <MealDescription>{props.description}</MealDescription>
          <MealPrice>{props.price}zł</MealPrice>
        </div>
        <MealActionsButton>
          <MealButton onClick={addPizzaToCartHandler}>
            {!isAddPizzaToCartPending && '+'}
            {isAddPizzaToCartPending && <Loader size={'12px'} color={'black'}/>}
        </MealButton>
          <MealButton onClick={removePizzaHandler}>
            {!isPizzaRemoving && '-'}
            {isPizzaRemoving && <Loader size={'12px'} color={'black'}/>}
            </MealButton>
          <MealButton onClick={deletePizzaHandler}>
            {!isPizzaDeletePending && <img src={trash} alt="T" />}
            {isPizzaDeletePending && <Loader size={'12px'} color={'black'}/>}
          </MealButton>
        </MealActionsButton>
      </Meal>
    </Card>
  );
}

export default PizzaItem;