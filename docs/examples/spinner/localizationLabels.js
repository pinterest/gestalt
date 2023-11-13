// @flow strict
import { type Node as ReactNode } from 'react';
import { DefaultLabelProvider, Flex, Spinner, useReducedMotion } from 'gestalt';

export default function Example(): ReactNode {
  const reduced = useReducedMotion();
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
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
