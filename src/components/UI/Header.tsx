import React, { Fragment } from "react";
import PizzaLogo from '../../assets/pizza-svgrepo-com.svg'
import Cart from '../../assets/basket-fill.svg'
import { useQuery } from "@tanstack/react-query";
import { CartItemInterface, fetchCart } from "../../utils/https";
import { styled } from 'styled-components';
import Loader from "./Loader";

interface CartButtonPProps {
    color?:string,
    backgroundColor?:string,
};

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(161, 10, 10,0.7);
    height: 7rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.70);
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogoImg = styled.img`
    margin-right: 10px;
`;

const LogoP = styled.p`
    font-size: 2em;
    color: gold;
`;

const CartActionsSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CartButton = styled.button<{disabled:boolean}>`
    display: flex;
    width: 10rem;
    justify-content: center;
    gap: 5px;
    align-items: center;
    border: none;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.3);

    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

const CartButtonImg = styled.img`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const CartButtonP = styled.p<CartButtonPProps>`
    border: solid ${(props) => props.backgroundColor || 'gold'} 2px;
    color: ${(props) => props.color || 'black'};
    background-color: ${(props) => props.backgroundColor || 'gold'};
    text-align: center;
    font-weight: bolder;
    font-size: 14px;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
`;

const Header:React.FC<{onOpenModal: (event:React.MouseEvent) => void}> = (props) => {

    const { data, isSuccess, isError, isPending } = useQuery<CartItemInterface[]>({
        queryKey:['cart'],
        queryFn:fetchCart,
    });

    const totalQuantity = data?.reduce((sum:number,item:CartItemInterface) => sum + item.quantity, 0) || 0;

    let content:React.ReactNode;

    if(isPending) {
        content = <Loader size='1rem'/>
    }

    if(isError) {
        content = (
            <CartButtonP color='black' backgroundColor="red">!</CartButtonP>
        );
    }


    if(data) {
        content = (
            <CartButtonP>{totalQuantity}</CartButtonP>
        )
    }

    return (
        <Fragment>
        <HeaderStyled>
            <LogoContainer>
                <LogoImg src={PizzaLogo} alt='Pizza'/>
                <LogoP>FastPizza</LogoP>
            </LogoContainer>
            <CartActionsSection>
                <CartButton disabled={!isSuccess} onClick={props.onOpenModal}>
                    <CartButtonImg src={Cart} alt='Cart'/>
                    {content}
                </CartButton>
            </CartActionsSection>
        </HeaderStyled>
        </Fragment>
    );
}

export default Header;