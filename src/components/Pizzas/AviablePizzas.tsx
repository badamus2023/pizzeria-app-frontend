import React from "react";
import classes from './AviablePizzas.module.css';
import PizzaItem from "./PizzaItem";
import { useQuery } from "@tanstack/react-query";
import { Pizza, fetchPizzas } from "../../utils/https";

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

    return (
      <div className={classes.aviablePizzasContainer}>
        <div className={classes.menu}>
          <div className={classes.pizzasContainer}>{content}</div>
        </div>
      </div>
    );
};

export default AviablePizzas;