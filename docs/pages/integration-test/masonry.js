// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, Masonry } from 'gestalt';
import MasonryContainer from '../../integration-test-helpers/masonry/MasonryContainer.js';
import { generateExampleItems } from '../../integration-test-helpers/masonry/items-utils.js';

const measurementStore = Masonry.createMeasurementStore();

export default function TestPage(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <MasonryContainer
        MasonryComponent={Masonry}
        measurementStore={measurementStore}
        initialItems={generateExampleItems({ name: 'InitialPin' })}
      />
    </ColorSchemeProvider>
  );
}
