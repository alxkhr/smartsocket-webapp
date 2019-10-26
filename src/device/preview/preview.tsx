import { Button, Icon } from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';
import * as moment from 'moment';
import * as React from 'react';
import { useHistory } from 'react-router';

import { Device } from '../device.model';
import * as css from './preview.css';

export function DevicePreview(props: Device) {
  const history = useHistory();
  const [strategy, setStrategy] = React.useState(
    moment()
      .hours(props.chargingFinishedHour)
      .minutes(props.chargingFinishedMinute),
  );
  const progressColor =
    props.chargingState === 'unplugged'
      ? '#888888'
      : props.chargingState === 'plugged_in'
      ? '#ffffff'
      : '#5EB030';
  return (
    <div
      className={`${css.card} ${
        props.chargingState === 'unplugged'
          ? css.unplugged
          : props.chargingState === 'charging'
          ? css.charging
          : ''
      }`}
    >
      <div className={css.content}>
        <div
          className={css.title}
          onClick={() => {
            history.push(`/device/${props.id}/details`);
          }}
        >
          {props.name}
        </div>
        <div className={css.strategy}>
          <KeyboardTimePicker
            className={css.strategyInput}
            ampm={false}
            value={strategy}
            onChange={(v) => {
              setStrategy(v!);
            }}
          />
        </div>
        <div className={css.chargeNow}>
          {['charging', 'plugged_in'].includes(props.chargingState) ? (
            <Button
              color="primary"
              onClick={async () => {
                await fetch('/api/device', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: props.id,
                    immediateChargingActive: true,
                  }),
                });
              }}
            >
              <svg viewBox="0 0 100 100" className={css.chargeNowIcon}>
                <path
                  d="M38.105,90.126c-0.917,0-1.207-1.19-0.646-2.645L50.084,54.77c0.561-1.454-0.255-2.645-1.814-2.645H29.939
		c-1.559,0-2.366-1.187-1.794-2.637l14.586-36.978c0.572-1.45,2.315-2.637,3.875-2.637h16.998c1.559,0,2.14,1.07,1.292,2.378
		L49.648,35.747c-0.849,1.308-0.268,2.378,1.292,2.378h19.122c1.559,0,2.149,1.076,1.312,2.391l-30.078,47.22
		C40.457,89.05,39.021,90.126,38.105,90.126z"
                />
              </svg>
            </Button>
          ) : (
            <Icon className={css.chargeNowIcon}>link_off</Icon>
          )}
        </div>
        <div className={css.banner}>
          <img
            src={`/img/${
              ['car', 'smartphone', 'lawn_mower'].includes(props.type) ? props.type : 'car'
            }.svg`}
          />
        </div>
      </div>
      <div className={css.progress}>
        <svg viewBox="0 0 100 8" preserveAspectRatio="none" height="8px" width="100%">
          <rect
            fill={progressColor}
            x="0"
            y="0"
            width={(props.chargedSeconds / props.maxChargingTimeSeconds) * 100}
            height="8"
          />
          <rect fill={progressColor} x="0" y="7" width="100" height="1" />
        </svg>
      </div>
    </div>
  );
}
