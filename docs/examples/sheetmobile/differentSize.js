// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  Layer,
  SheetMobile,
  TextField,
} from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const [showComponentData, setShowComponentData] = useState<?string>(null);
  const [showNextData, setShowNextData] = useState<?string>(null);

  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  const resetShowNextData = (animationState: 'in' | 'out') => {
    if (animationState === 'in') {
      setShowNextData(null);
    }
  };

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showComponent && showComponentData === 'A' ? (
        <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
          <SheetMobile
            heading="Heading"
            onAnimationEnd={({ animationState }) => {
              resetShowNextData(animationState);

              if (animationState === 'out' && showNextData === 'B') {
                setShowComponentData('B');
                setShowComponent(true);
              }
              if (animationState === 'out' && !showNextData) {
                setShowComponentData(null);
              }
            }}
            onDismiss={() => {
              setShowComponent(false);
            }}
          >
            <Flex justifyContent="center" alignContent="center" height="100%">
              <SheetMobile.DismissingElement>
                {({ onDismissStart }) => (
                  <Button
                    color="red"
                    text="Review form"
                    onClick={() => {
                      onDismissStart();
                      setShowNextData('B');
                    }}
                  />
                )}
              </SheetMobile.DismissingElement>
            </Flex>
          </SheetMobile>
        </Layer>
      ) : null}
      {showComponent && showComponentData === 'B' ? (
        <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
          <SheetMobile
            backIconButton={{
              accessibilityLabel: 'Previous page',
              onClick: ({ onDismissStart }) => {
                onDismissStart();
                setShowNextData('A');
              },
            }}
            heading="Heading"
            size="auto"
            onAnimationEnd={({ animationState }) => {
              resetShowNextData(animationState);

              if (animationState === 'out' && showNextData === 'A') {
                setShowComponentData('A');
                setShowComponent(true);
              }
            }}
            onDismiss={() => setShowComponent(false)}
            footer={
              <Flex justifyContent="center" gap={2}>
                <SheetMobile.DismissingElement>
                  {({ onDismissStart }) => (
                    <Button
                      color="red"
                      text="Submit"
                      onClick={() => {
                        onDismissStart();
                        setShowNextData(null);
                      }}
                    />
                  )}
                </SheetMobile.DismissingElement>
              </Flex>
            }
          >
            <Flex justifyContent="center" alignContent="center" direction="column" gap={4}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                <TextField
                  key={x}
                  id={`Input${x}`}
                  label={`Input${x}`}
                  onChange={() => {}}
                  placeholder={`Input${x}`}
                  type="text"
                />
              ))}
            </Flex>
          </SheetMobile>
        </Layer>
      ) : null}
      <Box padding={2}>
        <Button
          accessibilityLabel="Show SheetMobile"
          color="red"
          text="Show SheetMobile"
          size="lg"
          onClick={() => {
            setShowComponentData('A');
            setShowComponent(true);
          }}
        />
      </Box>
    </DeviceTypeProvider>
  );
}
