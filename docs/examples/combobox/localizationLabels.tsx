import { ReactNode, useState } from 'react';
import { Box, ComboBox, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example() {
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

  const [errorMessage, setErrorMessage] = useState<string | null | undefined>();

  // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ ComboBox: { noResultText: string; accessibilityClearButtonLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        ComboBox: {
          noResultText: 'Keine Ergebnisse',
          accessibilityClearButtonLabel: 'Eingabe löschen.',
        },
      }}
    >
      <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
        <Box paddingX={8} paddingY={8}>
          <ComboBox
            accessibilityClearButtonLabel="Löscht den aktuellen Wert"
            // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'string | undefined'.
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
