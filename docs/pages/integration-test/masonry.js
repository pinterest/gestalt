// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, Masonry } from 'gestalt';
import { useRouter } from 'next/router';
import MasonryContainer from '../../integration-test-helpers/masonry/MasonryContainer.js';
import { generateExampleItems } from '../../integration-test-helpers/masonry/items-utils.js';

const measurementStore = Masonry.createMeasurementStore();

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
        scrollContainer={scrollContainer}
        virtualize={virtualize}
      />
    </ColorSchemeProvider>
  );
}
