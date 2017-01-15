import React from 'react';
import {render} from 'react-dom';

import globalStyles from '_utils/global-styles';
import GoogleMap from 'containers/GoogleMap/GoogleMap';

render(<GoogleMap/>, document.querySelector('#app'));