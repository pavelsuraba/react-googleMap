import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
    padding: 0 0 0 10px;
    font-size: 14px;
    height: 40px;
    border: 1px solid #999;
    border-radius: 3px;
    color: #333;
    transition: all 300ms ease;
    outline: 0;
    width: 100%;
    &:focus {
        border: 1px solid #1DABB8;
    }
`;