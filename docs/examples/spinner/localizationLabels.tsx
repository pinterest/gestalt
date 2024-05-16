import { ReactNode } from 'react';
import { DefaultLabelProvider, Flex, Spinner, useReducedMotion } from 'gestalt';

export default function Example() {
  const reduced = useReducedMotion();
  return (
    <DefaultLabelProvider
      labels={{
        Spinner: {
          accessibilityLabel: 'Analysetabelle wird geladen.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Spinner show={!reduced} />
      </Flex>
    </DefaultLabelProvider>
  );
}
