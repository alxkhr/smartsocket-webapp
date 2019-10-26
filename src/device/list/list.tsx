import { Add } from '@material-ui/icons';
import * as React from 'react';
import { useHistory } from 'react-router';

import { Screen } from '../../screen/screen';
import { Device } from '../device.model';
import { DevicePreview } from '../preview/preview';
import * as css from './list.css';

export function DeviceList() {
  const history = useHistory();
  const [devices, setDevices] = React.useState<Device[]>([]);
  React.useEffect(() => {
    let cancelableSetDevices: ((devices: Device[]) => void) | null = setDevices;
    fetchDevices(cancelableSetDevices);
    return () => {
      cancelableSetDevices = null;
    };
  }, []);
  return (
    <Screen
      title="My Devices"
      menu={[
        {
          onClick: () => {
            history.push(`/device/create/config`);
          },
          icon: <Add style={{ fontSize: '2rem' }} />,
        },
      ]}
    >
      <ul className={css.grid}>
        {devices
          .filter((d) => d.chargingState === 'charging')
          .map((d) => (
            <li key={d.id}>
              <DevicePreview {...d} />
            </li>
          ))}
        {devices
          .filter((d) => d.chargingState === 'plugged_in')
          .map((d) => (
            <li key={d.id}>
              <DevicePreview {...d} />
            </li>
          ))}
        {devices
          .filter((d) => d.chargingState === 'unplugged')
          .map((d) => (
            <li key={d.id}>
              <DevicePreview {...d} />
            </li>
          ))}
      </ul>
    </Screen>
  );
}

async function fetchDevices(setDevices: ((devices: Device[]) => void) | null) {
  const response = await fetch('/api/devices');
  const devices: Device[] = await response.json();
  if (setDevices) {
    setDevices(devices);
  }
}
