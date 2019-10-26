export interface Device {
  id: string;
  name: string;
  type: string;
  maxChargingTimeSeconds: number;
  chargedSeconds: number;
  chargingFinishedHour: number;
  chargingFinishedMinute: number;
  immediateChargingActive: false;
  chargingState: string;
}
