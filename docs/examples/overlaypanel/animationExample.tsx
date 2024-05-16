import { Fragment, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  IconButton,
  Layer,
  OverlayPanel,
} from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const renderSubheading = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Box marginBottom={4} marginEnd={8} marginStart={8}>
          <Button color="blue" onClick={onDismissStart} text="Close on Sub-heading" />
        </Box>
      )}
    </OverlayPanel.DismissingElement>
  );

  const renderFooter = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Flex justifyContent="end">
          <Button onClick={onDismissStart} text="Close on Footer" />
        </Flex>
      )}
    </OverlayPanel.DismissingElement>
  );

  const renderContent = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Flex alignItems="center" height="100%" justifyContent="center">
          <IconButton
            accessibilityLabel="Done icon left"
            icon="directional-arrow-right"
            iconColor="red"
            onClick={onDismissStart}
            size="lg"
          />
          <Button color="red" onClick={onDismissStart} size="lg" text="Done on Children" />
          <IconButton
            accessibilityLabel="Done icon right"
            icon="directional-arrow-left"
            iconColor="red"
            onClick={onDismissStart}
            size="lg"
          />
        </Flex>
      )}
    </OverlayPanel.DismissingElement>
  );

  return (
    <Fragment>
      <Box padding={8}>
        <Button onClick={() => setShowComponent(true)} text="Open example overlay panel" />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close"
            accessibilityLabel="Animated overlay panel"
            footer={renderFooter}
            heading="Animated OverlayPanel"
            onDismiss={() => setShowComponent(false)}
            size="md"
            subHeading={renderSubheading}
          >
            {renderContent}
          </OverlayPanel>
        </Layer>
      )}
    </Fragment>
  );
}
