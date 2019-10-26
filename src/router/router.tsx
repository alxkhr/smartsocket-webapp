import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { DeviceConfig } from '../device/config/config';
import { DeviceDetails } from '../device/details/details';
import { DeviceList } from '../device/list/list';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/devices">
          <DeviceList />
        </Route>
        <Route path="/device/:id/details">
          <DeviceDetails />
        </Route>
        <Route path="/device/:id/config">
          <DeviceConfig />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
