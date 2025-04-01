import { ButtonSocial, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <ButtonSocial service="apple" type="continue" />
    </ColorSchemeProvider>
  );
}
