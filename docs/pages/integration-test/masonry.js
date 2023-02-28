// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, Masonry } from 'gestalt';
import { useRouter } from 'next/router';
import MasonryContainer from '../../integration-test-helpers/masonry/MasonryContainer.js';
import { generateExampleItems } from '../../integration-test-helpers/masonry/items-utils.js';

const measurementStore = Masonry.createMeasurementStore();

// This is the counterpart to `normalizeValue` in `playwright/masonry/utils/getServerURL.mjs`
// This will likely need to be updated in the near future
function booleanize(value: '1' | '0'): boolean {
  return Boolean(Number(value));
}

export default function TestPage(): Node {
  const router = useRouter();
  const { offsetTop, scrollContainer, virtualize } = router.query;

  return (
    <ColorSchemeProvider colorScheme="light">
      <MasonryContainer
        initialItems={generateExampleItems({ name: 'InitialPin' })}
        MasonryComponent={Masonry}
        measurementStore={measurementStore}
        offsetTop={offsetTop}
        scrollContainer={booleanize(scrollContainer)}
        virtualize={booleanize(virtualize)}
      />
    </ColorSchemeProvider>
  );
}
