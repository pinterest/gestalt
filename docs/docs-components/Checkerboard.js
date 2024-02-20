// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, useColorScheme } from 'gestalt';

export default function Checkerboard(): ReactNode {
  const { name: colorSchemeName } = useColorScheme();
  const color =
    colorSchemeName === 'lightMode'
      ? 'var(--color-background-dark)'
      : '#efefef'.replace('#', '%23');
  return (
    <Box
      height="100%"
      width="100%"
      dangerouslySetInlineStyle={{
        __style: {
          backgroundImage: `
          url('data:image/svg+xml;utf8,
            <svg preserveAspectRatio="none"  viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="5" height="5" fill-opacity="0.1" fill="${color}" />
              <rect x="5" y="5" width="5" height="5" fill-opacity="0.1" fill="${color}" />
              <rect x="5" y="0" width="5" height="5" fill-opacity="0.1" fill="transparent" />
              <rect x="0" y="5" width="5" height="5" fill-opacity="0.1" fill="transparent" />
            </svg>
          ')`
            .split('\n')
            .join(''),
          backgroundSize: '16px 16px',
        },
      }}
    />
  );
}
