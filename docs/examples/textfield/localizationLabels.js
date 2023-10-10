// @flow strict
import { type Node, useState } from 'react';
import { Box, DefaultLabelProvider, TextField } from 'gestalt';

export default function Example(): Node {
  const [password, setPassword] = useState<string>('');

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        TextField: {
          accessibilityHidePasswordLabel: 'Passwort verstecken',
          accessibilityShowPasswordLabel: 'Passwort anzeigen',
        },
      }}
    >
      <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
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
