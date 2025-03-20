import { ButtonSocial, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ButtonSocial service='apple' type='continue'/>
    </ColorSchemeProvider>
  );
}
