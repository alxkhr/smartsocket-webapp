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
      {devices.map(({ id, name }) => (
        <li
          key={id}
          onClick={() => {
            history.push(`/device/${id}/details`);
          }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

const deviceMock: Device[] = [
  { id: '123', name: 'Smartphone 1' },
  { id: '456', name: 'Porsche 1' },
  { id: '789', name: 'Rasenmäher 1' },
];

async function fetchDevices(setDevices: (devices: Device[]) => void) {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 100);
  });
  setDevices(deviceMock);
}
