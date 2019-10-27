export interface Device {
  id: string;
  name: string;
  type: string;
  maxChargingTimeSeconds: number;
  chargedSeconds: number;
  chargingFinishedHour: number;
  chargingFinishedMinute: number;
  immediateChargingActive: boolean;
  chargingState: string;
}
