import React, {Component} from 'react';
import styled from 'styled-components';
import data from './data.json';
import Map from 'containers/Map/Map';
import Search from 'containers/Search/Search';
import Location from 'components/Location/Location';
import {GoogleMapContainer,GoogleMapSearch} from 'components/_GoogleMap/styles';

export default class GoogleMap extends Component {
    constructor() {
        super();

        this.setCurrentLocation = this.setCurrentLocation.bind(this)

        this.state = {
            location: { // czech republic as a default
                lat: 49.7340416,
                lng: 15.6577229
            },
            zoom: 0,
            name: '',
            info: ''
        }
    }

    setCurrentLocation(place) {
        this.setState({...this.state, ...place});
    }

    render() {
        return (
            <GoogleMapContainer>
                <GoogleMapSearch>
                    <Search setCurrentLocation={this.setCurrentLocation} data={data.branches}/>
                </GoogleMapSearch>
                <Location name={this.state.name}/>
                <Map mapSetting={this.state} data={data.branches} key={this.props.key}/>
            </GoogleMapContainer>
        )
    }
}