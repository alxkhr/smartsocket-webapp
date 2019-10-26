import * as React from 'react';
import { useParams } from 'react-router';

export function DeviceDetails() {
  const { id } = useParams();
  return <div>device details: {id}</div>;
}
