import React, { Fragment } from "react";
import { styled } from "styled-components";
import {useForm, SubmitHandler} from 'react-hook-form';
import { ErrorP } from "../Pizzas/NewPizza";

interface InputProps {
  $isValid:boolean;
}

interface CheckoutFormInput {
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  zipCode: string,
  phone: string,

}

const CheckoutFormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input<InputProps>`
  border: solid orange 0.1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-top: 2px;
  width: 15rem;
  height: 2rem;
  text-align: center;
  font-weight: bold;
  outline: none;

  @media (max-width: 768px) {
    height: 1.5rem;
  }

  ${(props) => props.$isValid ? '' : 'border: 2px solid red; background-color: rgba(255, 0, 0, 0.2)'}

`;

const Label = styled.label`
  margin-top: 3px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 25rem;
  height: auto;
  border-radius: 20px;
  text-align: center;
`;

const CheckoutActions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    margin-top: 5px;
    flex-direction: column;
    gap:5px;
    margin-bottom: 5px;
  }
`;

const CheckoutButton = styled.button`
  background-color: orange;
  margin-top: 1.5rem;
  border: none;
  border-radius: 10px;
  width: 10rem;
  height: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  letter-spacing: 1px;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Checkout:React.FC<{onGoBack: (event:React.MouseEvent) => void}> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInput>();
  const onSubmit: SubmitHandler<CheckoutFormInput> = (data) =>
    console.log(data);

  return (
    <CheckoutFormContainer>
      <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="checkoutName">Imie</Label>
        <Input
          {...register("firstName", { required: true })}
          id="checkoutName"
          autoComplete="off"
          aria-invalid={errors.firstName ? "true" : "false"}
          $isValid={!errors.firstName ? true : false}
        />
        {errors.firstName?.type === "required" && (
          <ErrorP>*To pole nie może być puste</ErrorP>
        )}
        <Label htmlFor="checkoutLastName">Nazwisko</Label>
        <Input
          {...register("lastName", { required: true })}
          id="checkoutLastName"
          autoComplete="off"
          aria-invalid={errors.lastName ? "true" : "false"}
          $isValid={!errors.lastName ? true : false}
        />
        {errors.lastName?.type === "required" && (
          <ErrorP>*To pole nie może być puste</ErrorP>
        )}
        <Label htmlFor="checkoutStreet">Adres</Label>
        <Input
          {...register("street", { required: true })}
          id="checkoutStreet"
          autoComplete="off"
          aria-invalid={errors.street ? "true" : "false"}
          $isValid={!errors.street ? true : false}
        />
        {errors.street?.type === "required" && (
          <ErrorP>*To pole nie może być puste</ErrorP>
        )}
        <Label htmlFor="checkoutCity">Miasto</Label>
        <Input
          {...register("city", { required: true })}
          id="checkoutCity"
          autoComplete="off"
          aria-invalid={errors.city ? "true" : "false"}
          $isValid={!errors.city ? true : false}
        />
        {errors.city?.type === "required" && (
          <ErrorP>*To pole nie może być puste</ErrorP>
        )}
        <Label htmlFor="checkoutZip-code">Kod pocztowy</Label>
        <Input
          {...register("zipCode", {
            required: true,
            pattern: /[0-9]{2}[\-]?[0-9]{3}/,
          })}
          id="checkoutZip-code"
          autoComplete="off"
          aria-invalid={errors.zipCode ? "true" : "false"}
          $isValid={!errors.zipCode ? true : false}
        />
        {errors.zipCode?.type === "required" && (
          <ErrorP>*To pole nie może być puste</ErrorP>
        )}
        {errors.zipCode?.type === "pattern" && (
          <ErrorP>*Zły Format (00-000)</ErrorP>
        )}
        <Label htmlFor="checkoutPhone">Numer Telefonu</Label>
        <Input
          {...register("phone", { required: true, pattern: /[0-9]{9}/ })}
          id="checkoutPhone"
          autoComplete="off"
          aria-invalid={errors.phone ? "true" : "false"}
          $isValid={!errors.phone ? true : false}
        />
        {errors.phone?.type === "required" && (
          <ErrorP>*To pole nie może być puste</ErrorP>
        )}
        {errors.phone?.type === "pattern" && (
          <ErrorP>*Zły Format (000-000-000)</ErrorP>
        )}
        <CheckoutActions>
          <CheckoutButton type="submit">Zamów</CheckoutButton>
          <CheckoutButton type="button" onClick={props.onGoBack}>
            Wróć
          </CheckoutButton>
        </CheckoutActions>
      </CheckoutForm>
    </CheckoutFormContainer>
  );
}

export default Checkout;