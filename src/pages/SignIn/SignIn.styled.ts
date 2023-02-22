import styled from "styled-components";

export const ContainerSignIn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BoxSignIn = styled.div`
    width: 50%;
    padding: 1.87rem 2.18rem;
    background-color: yellow;
    border: .0625rem solid black;
    border-radius: 1.25rem;
    gap: .5rem;
`;

export const BoxInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    border: .125rem solid yellow;

    input {
        border: .0625rem solid rgb(203, 213, 225);
        border-radius: .375rem;
    }
`;

export const BoxButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button { 
        text-transform: capitalize;
    }
`;
