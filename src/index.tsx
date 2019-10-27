import * as React from 'react';
import { render } from 'react-dom';

import { App } from './app/app';

render(<App />, document.getElementById('main'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
