import { QueryClient } from "@tanstack/react-query";

interface PizzaResponse {
  pizzas: Array<Pizza>;
}

interface CartItemResponse {
  cart: Array<CartItemInterface>;
}

export interface CartItemInterface {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface NewPizzaObj {
  pizza: {
    name: string;
    description: string;
    price: string;
  };
}

export interface ErrorInterface extends Error {
  code?: number;
  info?: any;
}

export const queryClient = new QueryClient();

export const fetchPizzas = async (): Promise<Array<Pizza>> => {
  const response = await fetch("http://localhost:3000/pizzas");

  if (!response.ok) {
    const error: ErrorInterface = new Error(
      "Pojawil sie blad przy wczytywaniu menu"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { pizzas }: PizzaResponse = await response.json();

  return pizzas;
};

export const fetchCart = async ():Promise<Array<CartItemInterface>> => {
  const response = await fetch("http://localhost:3000/cart");

  if (!response.ok) {
    const error: Error = new Error("Pojawil sie blad przy wczytywaniu menu");
    throw error;
  }

  const { cart }: CartItemResponse = await response.json();

  return cart;
}

export const deletePizza = async ({ id }: { id: number }): Promise<void> => {
  const response = await fetch(`http://localhost:3000/pizzas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: ErrorInterface = new Error(
      "Pojawil sie problem podczas usuwania pizzy"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
};

export const addPizza = async (pizzaData:NewPizzaObj):Promise<void> => {
  const response = await fetch("http://localhost:3000/pizzas", {
    method: "POST",
    body: JSON.stringify(pizzaData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorInterface = new Error(
      "Podczas dodawania pizzy wystapil blad"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { pizza } = await response.json();

  return pizza;
}

export const addPizzaToCart = async ({id}:{id:number}):Promise<void> => {
  const response = await fetch(`http://localhost:3000/cart/${id}`, {
    method: "POST",
  });

  if (!response.ok) {
    const error: ErrorInterface = new Error(
      "Podczas dodawania pizzy do koszyka wystapil problem"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export const removePizzaFromCart = async ({id}:{id:number}):Promise<void> => {
  const response = await fetch(`http://localhost:3000/cart/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: ErrorInterface = new Error(
      "Podczas usuwania pizzy z koszyka wystapil problem"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export const clearCart = async ():Promise<void> => {
  const response = await fetch("http://localhost:3000/clear-cart");

  return response.json();
}