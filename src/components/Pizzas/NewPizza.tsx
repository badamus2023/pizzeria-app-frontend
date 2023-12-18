import React, { useRef, Fragment} from "react";
import classes from './NewPizza.module.css'
import { useMutation } from "@tanstack/react-query";
import { NewPizzaObj, addPizza, queryClient } from "../../utils/https";

const NewPizza: React.FC = () => {
  const pizzaNameInputRef = useRef<HTMLInputElement>(null);
  const pizzaDescriptionInputRef = useRef<HTMLInputElement>(null);
  const pizzaPriceInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addPizza,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName: string = pizzaNameInputRef.current!.value;
    const enteredDescription: string = pizzaDescriptionInputRef.current!.value;
    const enteredPrice: string = pizzaPriceInputRef.current!.value;

    if (
      enteredName.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPrice.trim().length === 0
    ) {
      return;
    }
    const pizzaData: NewPizzaObj = {
      pizza: {
        name: enteredName,
        description: enteredDescription,
        price: enteredPrice,
      },
    };
    mutate(pizzaData);
  };

  return (
    <Fragment>
      <div className={classes.adminPanelContainer}>
        <div className={classes.adminPanel}>
          <h2>Admin Panel</h2>
          <form onSubmit={submitHandler} className={classes.addPizzaForm}>
            <label>Nazwa</label>
            <input type="text" id="name" ref={pizzaNameInputRef} />
            <label>Opis</label>
            <input
              type="text"
              id="description"
              ref={pizzaDescriptionInputRef}
            />
            <label>Cena</label>
            <input type="text" id="price" ref={pizzaPriceInputRef} />
            <button type="submit">Dodaj</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPizza;