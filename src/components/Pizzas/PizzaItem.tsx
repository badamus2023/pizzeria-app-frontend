import React from "react";
import classes from './PizzaItem.module.css'
import Card from "../UI/Card";
import trash from "../../assets/trash.svg"
import { useMutation } from "@tanstack/react-query";
import { addPizzaToCart, deletePizza, queryClient, removePizzaFromCart } from "../../utils/https";

const PizzaItem:React.FC<{name:string, description:string, price:number, id:number}> = (props) => {

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: deletePizza,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['pizzas']});
        }
    });

    const {mutate:addPizza, isPending:isPizza, isError:isPizzaError, error:pizzaError} = useMutation({
        mutationFn: addPizzaToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['cart']});
        }
    });

    const {mutate:removePizza, isPending:isPizzaRemoving, isError:isPizzaRemoveError,error:pizzaRemoveError} = useMutation({
        mutationFn: removePizzaFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['cart']})
        }
    });

    const removePizzaHandler = ():void => {
        removePizza({id: props.id})
    }

    const addPizzaToCartHandler = ():void => {
        addPizza({id: props.id})
    }

    const deletePizzaHandler = ():void => {
        mutate({id: props.id})
    }

    return (
        <Card>
            <li className={classes.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{props.price}zł</div>
                </div>
                <div className={classes.actionButtons}>
                    <button onClick={addPizzaToCartHandler}>+</button>
                    <button onClick={removePizzaHandler} >-</button>
                    <button onClick={deletePizzaHandler}><img src={trash} alt='T'/></button>
                </div>
            </li>
        </Card>
    );
}

export default PizzaItem;