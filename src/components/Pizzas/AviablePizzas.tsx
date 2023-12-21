import React from "react";
import PizzaItem from "./PizzaItem";
import { useQuery } from "@tanstack/react-query";
import { Pizza, fetchPizzas } from "../../utils/https";
import { styled } from "styled-components";
import Loader from "../UI/Loader";

const AviablePizzasContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const  PizzasMenu = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  background-color: rgb(120, 120, 120, 0.3);
  width: 50vw;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const PizzaItemsContainer = styled.div`
  margin-top: 2rem;
`

const AviablePizzas:React.FC = () => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['pizzas'],
        queryFn: fetchPizzas,
    });

    let content:React.ReactNode;

    if(data) {
        content = data.map((pizza:Pizza) => 
        <PizzaItem key={pizza.id} id={pizza.id} description={pizza.description} price={pizza.price} name={pizza.name}/>
        )
    }

    if(isPending) {
      content = <Loader/>
    }

    return (
      <AviablePizzasContainer>
        <PizzasMenu>
          <PizzaItemsContainer>{content}</PizzaItemsContainer>
        </PizzasMenu>
      </AviablePizzasContainer>
    );
};

export default AviablePizzas;