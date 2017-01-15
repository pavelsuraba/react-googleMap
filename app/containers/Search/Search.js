import React, {Component,PropTypes} from 'react';
import SearchResults from 'components/SearchResults/SearchResults';
import {Button} from 'components/Button/Button';
import {Input} from 'components/Input/Input';
import {GoogleMapInput, GoogleMapForm} from 'components/_GoogleMap/styles';
import {findParentElement, cl} from '_utils/mixins';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        this.pickLocation = this.pickLocation.bind(this);
        this.blur = this.blur.bind(this);
        this.showLocation = this.showLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.input = null; 

        this.state = {
            results: [],
            targetLocation: '',
            isHelpVissible: false,
            index: 0,
            targetDestination: {}
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', e => {
            if(!this.state.isHelpVissible || findParentElement(e.target, 'FORM')) return;
            this.blur();
        });
    }

    handleSearch() {
        const textValue = this.input.value;
        const regex = new RegExp(textValue, 'gi');

        const results = this.props.data.filter(place => {
            return place.name.match(regex);
        });

        const targetDestination = results[0];
        this.setState({...this.state, results, isHelpVissible: true, index: 0, targetDestination});
    }

    blur(emptyValue = false) {
        this.setState({...this.state, isHelpVissible: false});
        if(emptyValue) this.input.value = '';
        this.input.blur();
    }  

    handleKeyboard(e) {
        const state = this.state;
        let value = null;
        let targetDestination = {};

        switch(e.keyCode) {
            // key: up
            case 38:
                if(state.index === 0) {
                    value = state.results.length - 1;
                } else {
                    value = state.index - 1;
                }
                targetDestination = this.state.results[value];
                this.setState({...state, index: value, targetDestination});
                return;

            // key: down
            case 40:
                if(state.index >= state.results.length - 1) {
                    value = 0;
                } else {
                    value = state.index + 1;
                }
                targetDestination = this.state.results[value];                
                this.setState({...state, index: value, targetDestination});
                return;

            // key: escape
            case 27:
                this.blur();
                return;                
        }
        this.handleSearch();
    }

    pickLocation(index) {
        /* using callback to prevent async bug */
        const targetDestination = this.state.results[index];
        this.setState({...this.state, index, targetDestination}, () => this.showLocation());
    }

    onSubmit(e) {
        e.preventDefault();
        this.showLocation();
    }

    showLocation() {
        this.props.setCurrentLocation(this.state.targetDestination);
        this.blur(true);
    }    

    render() {
        return (
            <GoogleMapForm action="" onSubmit={this.onSubmit} onKeyUp={this.handleKeyboard}>
                <GoogleMapInput>
                    <Input type="text" placeholder="Search" innerRef={comp => this.input = comp}/>
                    <SearchResults index={this.state.index} show={this.state.isHelpVissible} data={this.state.results} handleClick={this.pickLocation}/>
                </GoogleMapInput>
                <Button>Search</Button>
            </GoogleMapForm>
        )
    }
}

Search.propTypes = {
    data: PropTypes.array.isRequired,
    setCurrentLocation: PropTypes.func.isRequired
};