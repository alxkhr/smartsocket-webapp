import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { AirlineSeatIndividualSuite, DirectionsCar, Done, Smartphone } from '@material-ui/icons';
import { TimePicker } from '@material-ui/pickers';
import * as moment from 'moment';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';

import { Screen } from '../../screen/screen';
import * as css from './config.css';
import { getDeviceConfigPresetByType } from './presets';

export function DeviceConfig() {
  const { id } = useParams();
  const history = useHistory();
  // todo get initial values if id is 'create'
  const [strategy, setStrategy] = React.useState<moment.Moment | null>(null);
  const [duration, setDuration] = React.useState<moment.Moment | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<string | null>(null);
  async function create() {
    await fetch('/api/device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        type,
        maxChargingTimeSeconds: (duration!.hours() * 60 + duration!.minutes()) * 60,
        chargingFinishedHour: strategy!.hours(),
        chargingFinishedMinutes: strategy!.minutes(),
      }),
    });
    history.push('/devices');
  }
  const isUncomplete = !type || !name || !strategy || !duration;
  return (
    <Screen
      title="Create New Device"
      menu={
        isUncomplete
          ? []
          : [
              {
                onClick: () => {
                  create();
                },
                icon: <Done style={{ fontSize: '2rem' }} />,
              },
            ]
      }
    >
      <div className={css.container}>
        <Select
          className={css.input}
          value={type || ''}
          onChange={(e) => {
            const preset = getDeviceConfigPresetByType(e.target.value as string);
            if (!name) {
              setName(preset.name);
            }
            if (!strategy) {
              setStrategy(preset.strategy);
            }
            if (!duration) {
              setDuration(preset.duration);
            }
            setType(e.target.value as string);
          }}
        >
          <MenuItem value={'smartphone'}>
            <div className={css.option}>
              <Smartphone />
              <span>&nbsp;Smartphone</span>
            </div>
          </MenuItem>
          <MenuItem value={'car'}>
            <div className={css.option}>
              <DirectionsCar />
              <span>&nbsp;Car</span>
            </div>
          </MenuItem>
          <MenuItem value={'lawn_mower'}>
            <div className={css.option}>
              <AirlineSeatIndividualSuite style={{ verticalAlign: 'center' }} />
              <span>&nbsp;Lawn Mower</span>
            </div>
          </MenuItem>
        </Select>
        <TextField
          className={css.input}
          label="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <TimePicker
          autoOk
          ampm={false}
          label="Maximal Charging Duration"
          value={duration}
          className={css.input}
          onChange={setDuration}
        />
        <TimePicker
          autoOk
          ampm={false}
          className={css.input}
          label="Charged until"
          value={strategy}
          onChange={(v) => setStrategy(v)}
        />
        <Button color="primary" disabled={isUncomplete} onClick={create}>
          CREATE
        </Button>
      </div>
    </Screen>
  );
}
