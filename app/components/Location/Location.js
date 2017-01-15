import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
    margin: 0 0 20px 0;
    font-size: 18px;
`;

export default Location = (props) => <Text>{props.name}</Text>;

Location.propTypes = {
    name: React.PropTypes.string
}