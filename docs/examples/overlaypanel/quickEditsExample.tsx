import { Fragment, useState } from 'react';
import {
  Accordion,
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  OverlayPanel,
  RadioGroup,
  Text,
} from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const footer = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Flex alignItems="center" justifyContent="between">
          <Button color="transparent" text="Delete" />
          <Button color="red" onClick={onDismissStart} text="Apply changes" />
        </Flex>
      )}
    </OverlayPanel.DismissingElement>
  );

  return (
    <Fragment>
      <Box padding={8}>
        <Button onClick={() => setShowComponent(true)} text="View footer example" />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close"
            accessibilityLabel="Bulk edit for 5 ad groups of Nordstrom Account"
            footer={footer}
            heading="Editing 5 ad groups"
            onDismiss={() => setShowComponent(false)}
            size="md"
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 8,
              }}
            >
              <Text weight="bold">Bids</Text>
              <Flex
                gap={{
                  row: 4,
                  column: 0,
                }}
              >
                <Text>
                  Adjust bids for the selected ad groups below. Changes made here will apply to all
                  selected ad groups.
                </Text>
                <Flex.Item flex="none">
                  <Button disabled text="Reset bids" />
                </Flex.Item>
              </Flex>
              <Accordion.Expandable
                expandedIndex={0}
                id="accordionExample - default"
                items={[
                  {
                    children: (
                      <RadioGroup id="bidding2" legend="Bidding">
                        <RadioGroup.RadioButton
                          checked
                          helperText="Pinterest aims to get the most clicks for your budget"
                          id="automatic"
                          label="Automatic (recommended)"
                          name="Automatic"
                          onChange={() => {}}
                          value="automatic"
                        />
                        <RadioGroup.RadioButton
                          helperText="You control how much to bid at auction"
                          id="custom"
                          label="Custom"
                          name="custom"
                          onChange={() => {}}
                          value="custom"
                        />
                      </RadioGroup>
                    ),
                    summary: ['Custom'],
                    title: 'Bid',
                  },
                ]}
              />

              <Accordion.Expandable
                id="accordionExample - preview"
                items={[
                  {
                    children: <Text> Preview table of changes here</Text>,
                    summary: ['5 ad groups changing'],
                    title: 'Preview bid changes',
                  },
                ]}
              />
            </Flex>
          </OverlayPanel>
        </Layer>
      )}
    </Fragment>
  );
}
