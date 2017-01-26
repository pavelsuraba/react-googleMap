import React from 'react';
import {render} from 'react-dom';

import globalStyles from '_utils/global-styles';
import GoogleMap from 'containers/GoogleMap/GoogleMap';
import KEY from './apiKey.js'

render(<GoogleMap apiKey={KEY}/>, document.querySelector('#app'));