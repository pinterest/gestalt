// @flow strict
import { useEffect, type Node, useState } from 'react';
import {
  Flex,
  Layer,
  SheetMobile,
  Box,
  DeviceTypeProvider,
  Button,
  FixedZIndex,
  CompositeZIndex,
  EffectsProvider,
  useReducedMotion,
} from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState<null | boolean>(true);
  const [reduceMotionState, setReduceMotionState] = useState<null | boolean>(null);

  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  const useSheetMobileEffects = () => {
    const reducedMotion = useReducedMotion();

    useEffect(() => {
      setReduceMotionState(reducedMotion);
      return () => {
        // eslint-disable-next-line no-console
        console.log(`Unmounting`);
      };
    }, [reducedMotion]);
  };

  return (
    <EffectsProvider sheetMobile={useSheetMobileEffects}>
      <DeviceTypeProvider deviceType="mobile">
        {showComponent ? (
          <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
            <SheetMobile
              heading={`Reduce motion is ${reduceMotionState ? 'on' : 'off'} in your OS`}
              subHeading="Toggle reduce motion in your settings to see the change in SheetMobile"
              onDismiss={() => setShowComponent(false)}
              size="auto"
            >
              <SheetMobile.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex justifyContent="center" alignItems="center" height="100%">
                    <Button color="gray" text="Close" onClick={onDismissStart} />
                  </Flex>
                )}
              </SheetMobile.DismissingElement>
            </SheetMobile>
          </Layer>
        ) : null}
        <Box padding={2}>
          <Button
            accessibilityLabel="Show SheetMobile"
            color="red"
            text="Show SheetMobile"
            size="lg"
            onClick={() => setShowComponent(true)}
          />
        </Box>
      </DeviceTypeProvider>
    </EffectsProvider>
  );
}
