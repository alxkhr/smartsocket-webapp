import { Add } from '@material-ui/icons';
import * as React from 'react';
import { useHistory } from 'react-router';

import { Screen } from '../../screen/screen';
import { Device } from '../device.model';
import { DevicePreview } from '../preview/preview';
import { EmissionChart } from './chart/chart';
import * as css from './list.css';

export interface EmissionState {
  carbonIntensity: number;
  fossilFuelPercentage: number;
}

export function DeviceList() {
  const history = useHistory();
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [emissions, setEmissions] = React.useState<EmissionState>({
    carbonIntensity: 100,
    fossilFuelPercentage: 50,
  });
  React.useEffect(() => {
    let cancelableSetDevices: ((devices: Device[]) => void) | null = setDevices;
    let cancelableSetEmissions: ((emissions: EmissionState) => void) | null = setEmissions;
    fetchEmissions(cancelableSetEmissions);
    fetchDevices(cancelableSetDevices);
    const task = window.setInterval(() => {
      fetchDevices(cancelableSetDevices);
    }, 1000);
    return () => {
      window.clearInterval(task);
      cancelableSetDevices = null;
      cancelableSetEmissions = null;
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
      <div className={css.emission}>
        {emissions.fossilFuelPercentage >= 0 && <EmissionChart {...emissions} />}
      </div>
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

async function fetchEmissions(setEmissions: (emissions: EmissionState) => void) {
  const response = await fetch('/api/emissions/current');
  const emissions: EmissionState = await response.json();
  console.log(emissions);
  if (setEmissions) {
    setEmissions(emissions);
  }
}
