import React, { Fragment } from "react";
import classes from './NewPizza.module.css'
import { useMutation } from "@tanstack/react-query";
import { NewPizzaObj, addPizza, queryClient } from "../../utils/https";
import {useForm, SubmitHandler} from 'react-hook-form'

const NewPizza: React.FC = () => {

  interface NewPizzaForm {
    name: string,
    description: string,
    price: string,
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addPizza,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });

  const {register, handleSubmit} = useForm<NewPizzaForm>()
  const onSubmit:SubmitHandler<NewPizzaForm> = (data) => {
    const pizzaData:NewPizzaObj = {
      pizza: {
        name: data.name,
        description: data.description,
        price: data.price
      },
    };
    mutate(pizzaData);
  }

  return (
    <Fragment>
      <div className={classes.adminPanelContainer}>
        <div className={classes.adminPanel}>
          <h2>Admin Panel</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.addPizzaForm}>
            <label htmlFor="name">Nazwa</label>
            <input {...register('name')} id="name" autoComplete="off"/>
            <label htmlFor="description">Opis</label>
            <input {...register('description')} id="description" autoComplete="off"/>
            <label htmlFor="price">Cena</label>
            <input {...register('price')} id="price" autoComplete="off"/>
            <button type="submit">Dodaj</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPizza;