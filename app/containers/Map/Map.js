import React, {Component,PropTypes} from 'react';
import GoogleMapsLoader from 'google-maps';
import {GoogleMapView} from 'components/_GoogleMap/styles';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.googleMap = null;
        this.places = this.props.data;
        this.resize = this.resize.bind(this);

        GoogleMapsLoader.KEY = this.props.key;
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);        
        this.initiateMap(this.props.mapSetting);
        this.generateMarkers();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", resize);
    }    

    componentWillReceiveProps(nextProps) {
        if(this.props.mapSetting === nextProps.mapSetting) return;

        const props = nextProps.mapSetting;
        this.googleMap.panTo(props.location);
        this.googleMap.setZoom(props.zoom);
    }

    resize() {      
        const center = this.googleMap.getCenter();

        GoogleMapsLoader.load(google => {
            google.maps.event.trigger(this.googleMap, "resize");
            this.googleMap.setCenter(center);        
        });
    }

    generateMarkers() {
        const asyncMarkers = this.places.map(place => this.createMarker(place));
        Promise.all(asyncMarkers).then(markers => {
            this.fitOnMap(markers)
        })
    }

    createMarker(place) {
        const {location, zoom} = place;
        let marker = 1;

        const contentString = `
            <div id="content">
                <div id="siteNotice"></div>
                <h3 id="firstHeading" class="firstHeading">${place.info.name}</h3>
                <div id="bodyContent">
                    ${place.info.description}
                </div>
            </div>`;

        return new Promise((resolve,reject) => {
            GoogleMapsLoader.load(google => {
                const infowindow = new google.maps.InfoWindow({ content: contentString, maxWidth: 200 })

                marker = new google.maps.Marker({
                    position: location,
                    map: this.googleMap
                });

                marker.addListener('click', function() {
                    infowindow.open(this.googleMap, marker);
                });
                resolve(marker);
            });
        });
    }

    fitOnMap(markers) {
        GoogleMapsLoader.load(google => {
            const bounds = new google.maps.LatLngBounds();
            markers.map(marker => bounds.extend(marker.getPosition()))
            this.googleMap.fitBounds(bounds);        
        });
    }    

    initiateMap(settings) {
        const {location, zoom} = settings;

        GoogleMapsLoader.load(google => this.googleMap = new google.maps.Map(this.map, {center: location, zoom: zoom}));
    }

    render() {
        return (
            <GoogleMapView innerRef={comp => this.map = comp}/>
        )
    }
}

Map.propTypes = {
    data: PropTypes.array.isRequired,
    mapSetting: PropTypes.object.isRequired
};