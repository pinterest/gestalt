// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, Masonry } from 'gestalt';
import { useRouter } from 'next/router';
import MasonryContainer from '../../integration-test-helpers/masonry/MasonryContainer.js';
import { generateExampleItems } from '../../integration-test-helpers/masonry/items-utils.js';

const measurementStore = Masonry.createMeasurementStore();

// This is the counterpart to `normalizeValue` in `playwright/masonry/utils/getServerURL.mjs`
function booleanize(value: string): boolean {
  if (['false', '0'].includes(value)) {
    return false;
  }
  if (['true', '1'].includes(value)) {
    return true;
  }
  return Boolean(value);
}

export default function TestPage(): Node {
  const router = useRouter();
  const {
    constrained,
    finiteLength,
    flexible,
    manualFetch,
    offsetTop,
    scrollContainer,
    virtualize,
  } = router.query;

  return (
    <ColorSchemeProvider colorScheme="light">
      <MasonryContainer
        constrained={booleanize(constrained)}
        finiteLength={booleanize(finiteLength)}
        flexible={booleanize(flexible)}
        initialItems={generateExampleItems({ name: 'InitialPin' })}
        manualFetch={booleanize(manualFetch)}
        MasonryComponent={Masonry}
        measurementStore={measurementStore}
        offsetTop={offsetTop}
        scrollContainer={booleanize(scrollContainer)}
        virtualize={booleanize(virtualize)}
      />
    </ColorSchemeProvider>
  );
}
