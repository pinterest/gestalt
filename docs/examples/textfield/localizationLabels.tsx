import { ReactNode, useState } from 'react';
import { Box, DefaultLabelProvider, TextField } from 'gestalt';

export default function Example() {
  const [password, setPassword] = useState<string>('');

  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ TextField: { accessibilityHidePasswordLabel: string; accessibilityShowPasswordLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        TextField: {
          accessibilityHidePasswordLabel: 'Passwort verstecken',
          accessibilityShowPasswordLabel: 'Passwort anzeigen',
        },
      }}
    >
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
        <TextField
          id="enter-password"
          label="Konto-Passwort"
          onChange={({ value }) => setPassword(value)}
          placeholder="Kennwort"
          type="password"
          value={password}
        />
      </Box>
    </DefaultLabelProvider>
  );
}
