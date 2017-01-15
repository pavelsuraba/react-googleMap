import React, {PropTypes} from 'react';
import styled from 'styled-components';
import SearchItem from 'components/SearchItem/SearchItem';

const List = styled.ul`
    position: absolute;
    left: 0;
    top: 40px;
    background-color: blue;
    z-index: 1;
    transform: translate(0, -2px);
    width: 100%;
    border-radius: 0 0 3px 3px;
    overflow: hidden;
    @media (min-width: 450px) {
        max-width: 300px;
    }    
`;

const SearchResults = (props) => {

    const handleClick = (index) => {
        props.handleClick(index);
    }

    const renderPlaces = () => {
        return props.data.map((result, i) => {
            return <SearchItem key={i} index={i} handleClick={handleClick} highlight={(i === props.index)}>{result.name}</SearchItem>
        });
    }


    return (
        <List>{props.show && renderPlaces()}</List>
    )
};

SearchResults.propTypes = {
    index: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default SearchResults;