import styled from "styled-components";

export const ContainerSignIn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const BoxSignIn = styled.div`
    width: 24rem;
    padding: 1.5rem;
    border-radius: 1.25rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    background-color: #ffffff;
    
    .title {
        display: block;
        text-transform: capitalize;
        text-align: center;
        font-weight: 600;
        font-size: 1.875rem; 
        line-height: 2.25rem;
    }
    
    @media (max-width: 450px) {
        width: 20rem;
    }
`;

export const BoxInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .75rem;

    label {
        text-transform: capitalize;
        font-size: 1rem;
        line-height: 1.5rem;
        margin-bottom: .5rem;
    }

    input {
        width: 100%;
        font-size: 1rem;
        line-height: 1.5rem;
        padding: .5rem .5rem ;
        display: block;
        border: .0625rem solid rgb(203, 213, 225);
        border-radius: .375rem;
    }

    input:focus { 
        outline: none;
        border-color: rgb(75, 85, 99);
    }
`;

export const BoxButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button { 
        text-transform: capitalize;
        border: .125rem solid rgb(67, 56, 202);
        color: #ffffff;
        padding: .25rem 1.25rem;
        border-radius: 0.375rem;
        font-weight: 600;
    }

    button:hover {
        background-color: transparent;
        color: rgb(67, 56, 202);

    }
`;
