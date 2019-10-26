import * as moment from 'moment';

const deviceConfigPresets = [
  {
    type: 'smartphone',
    name: 'My Smartphone',
    strategy: moment()
      .hour(8)
      .minutes(30),
    duration: moment()
      .hour(1)
      .minutes(30),
  },
  {
    type: 'car',
    name: 'My Car',
    strategy: moment()
      .hour(8)
      .minutes(40),
    duration: moment()
      .hour(12)
      .minutes(0),
  },
  {
    type: 'lawn_mower',
    name: 'My Lawn Mower',
    strategy: moment()
      .hour(12)
      .minutes(0),
    duration: moment()
      .hour(3)
      .minutes(0),
  },
];

export function getDeviceConfigPresetByType(type: string) {
  return deviceConfigPresets.find((p) => p.type === type)!;
}
