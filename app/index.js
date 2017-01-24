import React from 'react';
import {render} from 'react-dom';

import globalStyles from '_utils/global-styles';
import GoogleMap from 'containers/GoogleMap/GoogleMap';
import KEY from './apiKej.js'

render(<GoogleMap key={KEY}/>, document.querySelector('#app'));