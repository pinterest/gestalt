// @flow strict
import { type Node, useState } from 'react';
import { Box, ComboBox, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example(): Node {
  const PRONOUNS = [
    'Dey/Dem',
    'Er/Ihm',
    'Ey/Em',
    'He/Him',
    'Hen/Hens',
    'She/Her',
    'Sie/Ihr',
    'They/Them',
    'Xier/Xiem',
  ];

  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: `value${index}` }));

  const [errorMessage, setErrorMessage] = useState<?string>();

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        ComboBox: {
          noResultText: 'Keine Ergebnisse',
          accessibilityClearButtonLabel: 'Eingabe löschen.',
        },
      }}
    >
      <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
        <Box paddingY={8} paddingX={8}>
          <ComboBox
            accessibilityClearButtonLabel="Löscht den aktuellen Wert"
            errorMessage={errorMessage}
            helperText="Wählen Sie die Pronomen, die in Ihrem Profil erscheinen sollen, damit andere wissen, wie sie Sie ansprechen sollen. Sie können diese jederzeit bearbeiten oder entfernen."
            id="header"
            label="Pronomen"
            onBlur={({ value }) => {
              if (value !== '' && !PRONOUNS.includes(value))
                setErrorMessage('Bitte wählen Sie eine gültige Option.');
            }}
            onChange={resetErrorMessage}
            onClear={resetErrorMessage}
            options={options}
            placeholder="Fügen Sie Ihre Pronomen hinzu"
          />
        </Box>
      </Flex>
    </DefaultLabelProvider>
  );
}
