import React, { Fragment } from "react";
import PizzaLogo from '../../assets/pizza-svgrepo-com.svg'
import Cart from '../../assets/basket-fill.svg'
import { useQuery } from "@tanstack/react-query";
import { CartItemInterface, fetchCart } from "../../utils/https";
import { styled } from 'styled-components';
import Loader from "./Loader";

interface CartButtonPProps {
    color?:string,
    $backgroundColor?:string,
    $borderColor?:string,
};

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(161, 10, 10,0.7);
    height: 7rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.70);
    width:100%
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogoImg = styled.img`
    margin-right: 10px;

    @media (max-width: 768) {
        width: 50%;
        height: 50%;
    }
`;

const LogoP = styled.p`
    font-size: 2em;
    color: gold;

    @media (max-width: 768px) {
        font-size: 1.5em;
    }
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

    @media (max-width: 768px) {
        width: 7rem;
    }
`;

const CartButtonImg = styled.img`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const CartButtonP = styled.p<CartButtonPProps>`
    display: flex;
    algin-items: center;
    justify-content: center;
    border: solid ${(props) => props.$borderColor || 'gold'} 2px;
    color: ${(props) => props.color || 'black'};
    background-color: ${(props) => props.$backgroundColor || 'gold'};
    text-align: center;
    font-weight: bolder;
    font-size: 13px;
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
            <CartButtonP color='black' $backgroundColor="rgba(128, 0, 0, 0.8)" $borderColor="red">!</CartButtonP>
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