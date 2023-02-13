import styled from "styled-components";

export const Nav = styled.nav`
    background-color: rgb(31, 41, 55);
`;

export const BoxLinks = styled.div`
    display: flex;

    .link {
        text-transform: capitalize;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.25rem;
        border-radius: 0.375rem;
        padding: .5rem .75rem .5rem .75rem;
    }

    .link:first-child {
        color: rgb(255, 255, 255);
        background-color: rgb(17, 24, 39);
    }

    .link:last-child {
        color: rgb(209,213,219);
    }

    .link:last-child:hover {
        background-color: rgb(55, 65, 81);
        color: rgb(255 255 255);
    }
`

export const MobileMenu = styled.div`
    display: none;
    
    @media (max-width: 640px) {
        display: block;
        text-transform: capitalize;

        .link { 
            display: block;
            border-radius: 0.375rem;
            padding: .5rem .75rem .5rem .75rem;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.5rem;
        }

        .link:first-child {
            color: rgb(255, 255, 255);
            background-color: rgb(17, 24, 39);
        }

        .link:last-child {
            color: rgb(209 213 219);
        }

        .link:last-child:hover {
            background-color: rgb(55, 65, 81);
            color: rgb(209 213 219);
        }
    }

`;