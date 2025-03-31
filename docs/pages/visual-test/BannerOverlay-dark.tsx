import { ColorSchemeProvider , DesignTokensProvider} from 'gestalt';
import BannerOverlay from './BannerOverlay';

export default function Example() {
  return (
    <ColorSchemeProvider colorScheme="dark">    <DesignTokensProvider>
      <BannerOverlay />
    </DesignTokensProvider></ColorSchemeProvider>
  );
}
