import * as React from 'react';
import { useHistory } from 'react-router';

import { Device } from '../device.model';

export function DeviceList() {
  const history = useHistory();
  const [devices, setDevices] = React.useState<Device[]>([]);
  React.useEffect(() => {
    fetchDevices(setDevices);
  }, []);
  return (
    <ul>
      {devices.map(({ id, friendlyName }) => (
        <li
          key={id}
          onClick={() => {
            history.push(`/device/${id}/details`);
          }}
        >
          {friendlyName}
        </li>
      ))}
    </ul>
  );
}

async function fetchDevices(setDevices: (devices: Device[]) => void) {
  const response = await fetch('/api/devices');
  const devices: Device[] = await response.json();
  setDevices(devices);
}
