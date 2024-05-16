import { ColorSchemeProvider } from 'gestalt';
import BannerOverlay from './BannerOverlay';

export default function Example() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <BannerOverlay />
    </ColorSchemeProvider>
  );
}
