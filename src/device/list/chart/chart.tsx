import { CountUp } from 'countup.js';
import * as React from 'react';

import { EmissionState } from '../list';
import * as css from './chart.css';

export function EmissionChart(props: EmissionState) {
  const goodEnergyPercentage = 100 - props.fossilFuelPercentage;
  const textRef = React.useRef<SVGTextElement>(null);
  React.useEffect(() => {
    const countUp = new CountUp(
      (textRef.current! as unknown) as HTMLElement,
      goodEnergyPercentage,
      { suffix: '%', duration: 1 },
    );
    countUp.start();
  }, [props.fossilFuelPercentage, props.carbonIntensity]);
  return (
    <svg
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={css.chart}
      style={{ color: `hsl(${goodEnergyPercentage * 1.2}, 80%, 50%)` }}
    >
      <circle
        style={{ strokeWidth: 1, stroke: 'currentColor', fill: 'none' }}
        cx="50"
        cy="50"
        r="36"
      />
      <circle
        className={css.circle}
        style={{
          strokeWidth: 8,
          stroke: 'currentColor',
          strokeDashoffset: props.fossilFuelPercentage * 2.5,
          fill: 'none',
        }}
        cx="0"
        cy="0"
        r="40"
        transform="translate(50 50) rotate(90) scale(-1 1)"
      />
      <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" ref={textRef} />
    </svg>
  );
}
