import { ReactElement, useEffect, useState } from 'react';
import LazyHydrate from 'react-lazy-hydration';
import { useRouter } from 'next/router';
import { ColorSchemeProvider, Masonry, MasonryV2 } from 'gestalt';
import generateExampleItems from '../../integration-test-helpers/masonry/items-utils/generateExampleItems';
import generateRealisticExampleItems from '../../integration-test-helpers/masonry/items-utils/generateRealisticExampleItems';
import getRandomNumberGenerator from '../../integration-test-helpers/masonry/items-utils/getRandomNumberGenerator';
import pinHeights, {
  PinHeight,
} from '../../integration-test-helpers/masonry/items-utils/pinHeights';
import MasonryContainer from '../../integration-test-helpers/masonry/MasonryContainer';

// This can get bumped up another order of magnitude or so if needed…perf drops off pretty rapidly after that
const REALISTIC_PINS_DATASET_SIZE = 1000;

type MasonryProps = Masonry<Record<any, any>>['props'];

type MeasurementStore = MasonryProps['measurementStore'];
type PositionStore = MasonryProps['positionStore'];

const measurementStore: MeasurementStore = Masonry.createMeasurementStore();
const positionStore: PositionStore = Masonry.createMeasurementStore();

// This is the counterpart to `normalizeValue` in `playwright/masonry/utils/getServerURL.ts`
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
function MaybeLazyHydrate({ children, ssrOnly }: { children: ReactElement; ssrOnly: boolean }) {
  if (ssrOnly) {
    return <LazyHydrate ssrOnly>{children}</LazyHydrate>;
  }
  return children;
}

// Inspired by https://stackoverflow.com/a/44915990/5253702
function randomSample({
  samples,
  field,
  randomNumberSeed,
}: {
  samples: ReadonlyArray<PinHeight>;
  field: 'impressionsCount' | 'pinsCount';
  randomNumberSeed: number;
}): number {
  // [0..1) * sum of weight
  let sample = randomNumberSeed * samples.reduce((sum, pin) => sum + pin[field], 0);

  // first sample n where sum of weight for [0..n] > sample
  // eslint-disable-next-line no-return-assign
  const { height } = samples.find((pin) => (sample -= pin[field]) < 0) ?? {};

  return height ?? 0;
}

export default function TestPage({
  randomNumberSeeds,
}: {
  randomNumberSeeds: ReadonlyArray<number>;
}) {
  const router = useRouter();
  // These should match playwright/masonry/utils/getServerURL.ts
  const {
    constrained,
    darkMode,
    deferMount,
    dynamicHeights,
    dynamicHeightsV2,
    externalCache,
    experimental,
    finiteLength,
    flexible,
    logWhitespace,
    manualFetch,
    multiColTest,
    noScroll,
    offsetTop,
    realisticPinHeights,
    scrollContainer,
    twoColItems,
    virtualBoundsBottom,
    virtualBoundsTop,
    virtualize,
  } = router.query as Record<string, string>;

  const constrainedValue = booleanize(constrained ?? '');
  const darkModeValue = booleanize(darkMode ?? '');
  const deferMountValue = booleanize(deferMount ?? '');
  const dynamicHeightsValue = booleanize(dynamicHeights ?? '');
  const dynamicHeightsV2Value = booleanize(dynamicHeightsV2 ?? '');
  const externalCacheValue = booleanize(externalCache ?? '');
  const experimentalValue = booleanize(experimental ?? '');
  const finiteLengthValue = booleanize(finiteLength ?? '');
  const flexibleValue = booleanize(flexible ?? '');
  const logWhitespaceValue = booleanize(logWhitespace ?? '');
  const manualFetchValue = booleanize(manualFetch ?? '');
  const multiColTestValue = booleanize(multiColTest ?? '');
  const noScrollValue = booleanize(noScroll ?? '');
  const offsetTopValue = Number(offsetTop);
  const realisticPinHeightsValue = booleanize(realisticPinHeights ?? '');
  const scrollContainerValue = booleanize(scrollContainer ?? '');
  const twoColItemsValue = booleanize(twoColItems ?? '');
  const virtualBoundsBottomValue = Number(virtualBoundsBottom);
  const virtualBoundsTopValue = Number(virtualBoundsTop);
  const virtualizeValue = booleanize(virtualize ?? '');

  // Generate a sample of realistic pin heights
  const pinHeightsSample = randomNumberSeeds.map((randomNumberSeed) =>
    randomSample({ samples: pinHeights, field: 'pinsCount', randomNumberSeed }),
  );

  // For some tests, we want to defer hydration and trigger it manually
  const [ssrOnly, setSSROnly] = useState(deferMountValue);
  useEffect(() => {
    const handleTriggerMount = () => {
      setSSROnly(false);
    };
    window.addEventListener('trigger-mount', handleTriggerMount);
    return () => {
      window.removeEventListener('trigger-mount', handleTriggerMount);
    };
  }, [deferMountValue]);

  return (
    <ColorSchemeProvider colorScheme={darkModeValue ? "dark" : "light"}>
      <MaybeLazyHydrate ssrOnly={ssrOnly}>
        <MasonryContainer
          constrained={constrainedValue}
          dynamicHeights={dynamicHeightsValue}
          dynamicHeightsV2={dynamicHeightsV2Value}
          externalCache={externalCacheValue}
          finiteLength={finiteLengthValue}
          flexible={flexibleValue}
          initialItems={
            realisticPinHeightsValue
              ? generateRealisticExampleItems({
                  name: 'InitialPin',
                  pinHeightsSample,
                })
              : generateExampleItems({ name: 'InitialPin' })
          }
          logWhitespace={logWhitespaceValue}
          manualFetch={manualFetchValue}
          MasonryComponent={experimentalValue ? MasonryV2 : Masonry}
          measurementStore={measurementStore}
          multiColTest={multiColTestValue}
          noScroll={noScrollValue}
          offsetTop={offsetTopValue}
          pinHeightsSample={realisticPinHeightsValue ? pinHeightsSample : undefined}
          positionStore={positionStore}
          scrollContainer={scrollContainerValue}
          twoColItems={twoColItemsValue}
          virtualBoundsBottom={virtualBoundsBottomValue}
          virtualBoundsTop={virtualBoundsTopValue}
          virtualize={virtualizeValue}
        />
      </MaybeLazyHydrate>
    </ColorSchemeProvider>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    randomNumberSeeds: ReadonlyArray<number>;
  };
}> {
  // This is used to ensure we're using the same dataset of realistic pins on the server and client
  const randomNumberSeeds = Array.from({
    length: REALISTIC_PINS_DATASET_SIZE,
  }).map(getRandomNumberGenerator(12345));
  return {
    props: {
      randomNumberSeeds,
    },
  };
}
