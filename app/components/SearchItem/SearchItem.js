import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
    color: #fff;
    background-color: ${props => props.highlight ? '#188f9a': '#1DABB8'};
    padding: 5px 0 5px 10px;
    font-weight: 300;
    cursor: pointer;    
    &:hover {
        background-color: #188f9a;        
    }    
`;

const SearchItem = (props) => {

    function pick() {
        props.handleClick(props.index);
    }

    return (
        <Item {...props} onClick={pick}>{props.children}</Item>
    )
};

SearchItem.propTypes = {
    highlight: React.PropTypes.bool,
    handleClick: React.PropTypes.func.isRequired
};

export default SearchItem;