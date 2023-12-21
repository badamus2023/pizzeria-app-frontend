import React, { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { NewPizzaObj, addPizza, queryClient } from "../../utils/https";
import {useForm, SubmitHandler} from 'react-hook-form'
import { styled } from 'styled-components';
import Loader from "../UI/Loader";

interface InputProps {
  $isValid: boolean;
}

const AdminPanelContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const AdminPanel = styled.div`
  width: 25%;
  height: auto;
  border-radius: 15px;
  background-color: rgb(255,165,0,0.7);
  text-align: center;

  @media (max-width: 768px) {
    width: 70%;
  }
`;

const AddPizzaForm = styled.form`
  display:flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const Input = styled.input<InputProps>`
  border-radius: 15px;
  height: 20px;
  text-align: center;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  font-size: 15px;
  outline: none;

  ${(props) => props.$isValid ? '' : 'border: 2px solid red; background-color: rgba(255, 0, 0, 0.2)'}
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const AdminPanelP = styled.h2`
`;

export const ErrorP = styled.p`
color: rgba(128, 0, 0, 0.8);
font-size: 14px;
letter-spacing: 1px;
`;

const AddPizzaButton = styled.button`
  margin-bottom: 1rem;
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

  const {register, handleSubmit, formState: { errors }} = useForm<NewPizzaForm>()

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

  let content: React.ReactNode = (
    <AddPizzaForm onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Nazwa</Label>
      <Input
        {...register("name", { required: true })}
        id="name"
        autoComplete="off"
        aria-invalid={errors.name ? "true" : "false"}
        $isValid={!errors.name ? true : false}
      />
      {errors.name?.type === "required" && (
        <ErrorP role="alert">*To pole nie może być puste</ErrorP>
      )}
      <Label htmlFor="description">Opis</Label>
      <Input
        {...register("description", { required: true })}
        id="description"
        autoComplete="off"
        aria-invalid={errors.description ? "true" : "false"}
        $isValid={!errors.description ? true : false}
      />
      {errors.description?.type === "required" && (
        <ErrorP role="alert">*To pole nie może być puste</ErrorP>
      )}
      <Label htmlFor="price">Cena</Label>
      <Input
        {...register("price", { required: true, pattern: /\d+(\.\d{2})?/ })}
        id="price"
        autoComplete="off"
        aria-invalid={errors.price ? "true" : "false"}
        $isValid={!errors.price ? true : false}
      />
      {errors.price?.type === "required" && (
        <ErrorP role="alert">*To pole nie może być puste</ErrorP>
      )}
      {errors.price?.type === "pattern" && (
        <ErrorP role="alert">*Nieprawidłowy format. (1.00)</ErrorP>
      )}
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