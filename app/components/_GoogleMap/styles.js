import React from 'react';
import styled from 'styled-components';
import {breakpoint} from '_utils/mixins'

export const GoogleMapContainer = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 0 10px;
    margin: auto;
    overflow: auto;
`;

export const GoogleMapSearch = styled.div`
    display: flex;
    justify-content: center;
    margin: 15px 0 15px 0;
    @media (min-width: 450px) {
        margin: 30px 0 30px 0;     
    }
`;

export const GoogleMapInput = styled.div`
    position: relative;
`;

export const GoogleMapView = styled.div`
    width: 100%;
    padding-bottom: 70%;
`;

export const GoogleMapForm = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: auto;
    @media (min-width: 450px) {
        flex-direction: row;     
    }
    div {
        flex-grow: 1;
    }
`;