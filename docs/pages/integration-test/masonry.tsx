import { ReactNode, useEffect, useState } from 'react';
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

// @ts-expect-error - TS2749 - 'Masonry' refers to a value, but is being used as a type here. Did you mean 'typeof Masonry'?
type MasonryProps = Masonry<Record<any, any>>['props'];

type MeasurementStore = MasonryProps['measurementStore'];
type PositionStore = MasonryProps['positionStore'];

// @ts-expect-error - TS2339 - Property 'createMeasurementStore' does not exist on type 'FunctionComponent<MasonryProps<any>>'.
const measurementStore: MeasurementStore = Masonry.createMeasurementStore();
// @ts-expect-error - TS2339 - Property 'createMeasurementStore' does not exist on type 'FunctionComponent<MasonryProps<any>>'.
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
function MaybeLazyHydrate({ children, ssrOnly }: { children: ReactNode; ssrOnly: boolean }) {
  if (ssrOnly) {
    // @ts-expect-error - TS2322 - Type 'ReactNode' is not assignable to type 'ReactNode & ReactElement<any, string | JSXElementConstructor<any>>'.
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
    deferMount,
    externalCache,
    experimental,
    finiteLength,
    flexible,
    logWhitespace,
    manualFetch,
    noScroll,
    offsetTop,
    realisticPinHeights,
    scrollContainer,
    twoColItems,
    virtualize,
    virtualBoundsTop,
    virtualBoundsBottom,
  } = router.query;

  // Generate a sample of realistic pin heights
  const pinHeightsSample = randomNumberSeeds.map((randomNumberSeed) =>
    randomSample({ samples: pinHeights, field: 'pinsCount', randomNumberSeed }),
  );

  // For some tests, we want to defer hydration and trigger it manually
  // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
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
      {/* @ts-expect-error - TS2786 - 'MaybeLazyHydrate' cannot be used as a JSX component. */}
      <MaybeLazyHydrate ssrOnly={ssrOnly}>
        {/* @ts-expect-error - TS2769 - No overload matches this call. */}
        <MasonryContainer
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          constrained={booleanize(constrained)}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          externalCache={booleanize(externalCache)}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          finiteLength={booleanize(finiteLength)}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          flexible={booleanize(flexible)}
          initialItems={
            realisticPinHeights
              ? generateRealisticExampleItems({
                  name: 'InitialPin',
                  pinHeightsSample,
                })
              : generateExampleItems({ name: 'InitialPin' })
          }
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          logWhitespace={booleanize(logWhitespace)}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          manualFetch={booleanize(manualFetch)}
          MasonryComponent={experimental ? MasonryV2 : Masonry}
          measurementStore={measurementStore}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          noScroll={booleanize(noScroll)}
          offsetTop={offsetTop}
          pinHeightsSample={realisticPinHeights ? pinHeightsSample : undefined}
          positionStore={positionStore}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          scrollContainer={booleanize(scrollContainer)}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          twoColItems={booleanize(twoColItems)}
          virtualBoundsBottom={virtualBoundsBottom}
          virtualBoundsTop={virtualBoundsTop}
          // @ts-expect-error - TS2345 - Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'.
          virtualize={booleanize(virtualize)}
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
