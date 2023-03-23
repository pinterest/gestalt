// @flow strict
import { type Node, useEffect, useState } from 'react';
import { ColorSchemeProvider, Masonry } from 'gestalt';
import { useRouter } from 'next/router';
import LazyHydrate from 'react-lazy-hydration';
import { generateExampleItems } from '../../integration-test-helpers/masonry/items-utils.js';
import MasonryContainer from '../../integration-test-helpers/masonry/MasonryContainer.js';

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

// LazyHydrate doesn't like to be used without any props, so we have to add it conditionally
function MaybeLazyHydrate({ children, ssrOnly }: {| children: Node, ssrOnly: boolean |}) {
  if (ssrOnly) {
    return <LazyHydrate ssrOnly>{children}</LazyHydrate>;
  }
  return children;
}

export default function TestPage(): Node {
  const router = useRouter();
  const {
    constrained,
    deferMount,
    externalCache,
    finiteLength,
    flexible,
    manualFetch,
    noScroll,
    offsetTop,
    scrollContainer,
    virtualize,
    virtualBoundsTop,
    virtualBoundsBottom,
  } = router.query;

  // For some tests, we want to defer hydration and trigger it manually
  const [ssrOnly, setSSROnly] = useState(booleanize(deferMount));
  useEffect(() => {
    const handleTriggerMount = () => {
      setSSROnly(false);
    };
    window.addEventListener('trigger-mount', handleTriggerMount);
    return () => {
      window.removeEventListener('trigger-mount', handleTriggerMount);
    };
  }, [deferMount]);

  return (
    <ColorSchemeProvider colorScheme="light">
      <MaybeLazyHydrate ssrOnly={ssrOnly}>
        <MasonryContainer
          constrained={booleanize(constrained)}
          externalCache={booleanize(externalCache)}
          finiteLength={booleanize(finiteLength)}
          flexible={booleanize(flexible)}
          initialItems={generateExampleItems({ name: 'InitialPin' })}
          manualFetch={booleanize(manualFetch)}
          MasonryComponent={Masonry}
          measurementStore={measurementStore}
          noScroll={booleanize(noScroll)}
          offsetTop={offsetTop}
          scrollContainer={booleanize(scrollContainer)}
          virtualize={booleanize(virtualize)}
          virtualBoundsTop={virtualBoundsTop}
          virtualBoundsBottom={virtualBoundsBottom}
        />
      </MaybeLazyHydrate>
    </ColorSchemeProvider>
  );
}
