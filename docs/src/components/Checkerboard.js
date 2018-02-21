// @flow
import React from 'react';

type Props = {|
  size?: number,
|};

export default function Checkerboard({ size = 8 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100%"
      height="100%"
      style={{ display: 'flex' }}
      preserveAspectRatio="none"
    >
      <pattern
        id="pattern"
        x={0}
        y={0}
        width={size * 2}
        height={size * 2}
        patternUnits="userSpaceOnUse"
      >
        <rect
          fill="rgba(0, 0, 0, 0.06)"
          x={0}
          width={size}
          height={size}
          y={0}
        />
        <rect
          fill="rgba(0, 0, 0, 0.06)"
          x={size}
          width={size}
          height={size}
          y={size}
        />
      </pattern>
      <rect fill="url(#pattern)" x={0} y={0} width="100%" height="100%" />
    </svg>
  );
}
