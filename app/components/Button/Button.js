import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
    padding: 0 20px;
    font-size: 16px;
    height: 40px;
    margin: 15px 0 0 0;
    background: transparent;
    border: none;
    background-color: #1DABB8;
    border-radius: 3px;
    color: #fff;
    transition: all 300ms ease;
    cursor: pointer;
    font-weight: 300;    
    &:hover {
        background-color: #188f9a;
    }
    @media (min-width: 450px) {
        margin: 0 0 0 15px;  
    }    
`;