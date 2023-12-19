import React, { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { NewPizzaObj, addPizza, queryClient } from "../../utils/https";
import {useForm, SubmitHandler} from 'react-hook-form'
import { styled } from 'styled-components';
import Loader from "../UI/Loader";

const AdminPanelContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const AdminPanel = styled.div`
  width: 25%;
  height: 20rem;
  border-radius: 15px;
  background-color: rgb(255,165,0,0.5);
  text-align: center;
`;

const AddPizzaForm = styled.form`
  display:flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 15px;
  height: 20px;
  text-align: center;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  font-size: 15px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const AdminPanelP = styled.h2`
`;

const AddPizzaButton = styled.button`
  margin-top: 1rem;
  width: 10rem;
  height: 2rem;
  border-radius: 15px;
  background-color: gold;
  font-weight: bold;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

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
  };

  let content:React.ReactNode = (
    <AddPizzaForm onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Nazwa</Label>
      <Input {...register("name")} id="name" autoComplete="off" />
      <Label htmlFor="description">Opis</Label>
      <Input {...register("description")} id="description" autoComplete="off" />
      <Label htmlFor="price">Cena</Label>
      <Input {...register("price")} id="price" autoComplete="off" />
      <AddPizzaButton type="submit">Dodaj</AddPizzaButton>
    </AddPizzaForm>
  );

  if(isPending) {
    content = <Loader/>
  }

  return (
    <Fragment>
      <AdminPanelContainer>
        <AdminPanel>
          <AdminPanelP>Admin Panel</AdminPanelP>
          {content}
        </AdminPanel>
      </AdminPanelContainer>
    </Fragment>
  );
};

export default NewPizza;