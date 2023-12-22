// @flow strict
import { type Node as ReactNode } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import BannerOverlay from './BannerOverlay';

export default function Example(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <BannerOverlay />
    </ColorSchemeProvider>
  );
}
