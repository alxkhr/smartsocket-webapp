import * as React from 'react';
import { useParams } from 'react-router';

export function DeviceConfig() {
  const { id } = useParams();
  return <div>device config: {id}</div>;
}
