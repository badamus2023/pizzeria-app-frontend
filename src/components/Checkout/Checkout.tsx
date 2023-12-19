import React, { Fragment } from "react";
import { styled } from "styled-components";
import {useForm, SubmitHandler} from 'react-hook-form';

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

const Input = styled.input`
  border: solid orange 0.1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-top: 2px;
  width: 15rem;
  height: 2rem;
  text-align: center;
  font-weight: bold;
`;

const Label = styled.label`
  margin-top: 3px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const CheckoutActions = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 25rem;
  height: 30rem;
  border-radius: 20px;
  text-align: center;
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
`;

const Checkout:React.FC<{onGoBack: (event:React.MouseEvent) => void}> = (props) => {
  const { register, handleSubmit } = useForm<CheckoutFormInput>();
  const onSubmit: SubmitHandler<CheckoutFormInput> = (data) =>
    console.log(data);

  return (
    <Fragment>
      <CheckoutFormContainer>
        <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="checkoutName">Imie</Label>
          <Input
            {...register("firstName")}
            id="checkoutName"
            autoComplete="off"
          />
          <Label htmlFor="checkoutLastName">Nazwisko</Label>
          <Input
            {...register("lastName")}
            id="checkoutLastName"
            autoComplete="off"
          />
          <Label htmlFor="checkoutStreet">Adres</Label>
          <Input
            {...register("street")}
            id="checkoutStreet"
            autoComplete="off"
          />
          <Label htmlFor="checkoutCity">Miasto</Label>
          <Input {...register("city")} id="checkoutCity" autoComplete="off" />
          <Label htmlFor="checkoutZip-code">Kod pocztowy</Label>
          <Input
            {...register("zipCode")}
            id="checkoutZip-code"
            autoComplete="off"
          />
          <Label htmlFor="checkoutPhone">Numer Telefonu</Label>
          <Input {...register("phone")} id="checkoutPhone" autoComplete="off" />
          <CheckoutActions>
            <CheckoutButton type="submit">Zamów</CheckoutButton>
            <CheckoutButton type="button" onClick={props.onGoBack}>
              Wróć
            </CheckoutButton>
          </CheckoutActions>
        </CheckoutForm>
      </CheckoutFormContainer>
    </Fragment>
  );
}

export default Checkout;