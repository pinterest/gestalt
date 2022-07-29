// @flow strict
import React, { type Node } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  Fieldset,
  FixedZIndex,
  Flex,
  Layer,
  Module,
  RadioButton,
  Sheet,
  Text,
} from 'gestalt';

function SheetWithFooter({ onDismiss }: {| onDismiss: () => void |}) {
  return (
    <Sheet
      accessibilityDismissButtonLabel="Close"
      accessibilitySheetLabel="Bulk edit for 5 ad groups of Nordstrom Account"
      heading="Editing 5 ad groups"
      onDismiss={onDismiss}
      // eslint-disable-next-line react/no-unstable-nested-components
      footer={({ onDismissStart }) => (
        <Flex alignItems="center" justifyContent="between">
          <Button color="transparent" text="Delete" />
          <Button color="red" text="Apply changes" onClick={onDismissStart} />
        </Flex>
      )}
      size="md"
    >
      <Flex direction="column" gap={8}>
        <Text weight="bold">Bids</Text>
        <Flex gap={4}>
          <Text>
            Adjust bids for the selected ad groups below. Changes made here will apply to all
            selected ad groups.
          </Text>
          <Flex.Item flex="none">
            <Button text="Reset bids" disabled />
          </Flex.Item>
        </Flex>
        <Module.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample - default"
          expandedIndex={0}
          items={[
            {
              children: (
                <Fieldset legend="What bid campaign do you want to run?" legendDisplay="hidden">
                  <Flex direction="column" gap={2}>
                    <RadioButton
                      checked
                      id="favoriteDog"
                      label="No change"
                      name="favorite"
                      onChange={() => {}}
                      value="dogs"
                    />
                    <RadioButton
                      checked={false}
                      id="favoriteCat"
                      label="Automatic (recommended)"
                      subtext="Pinterest aims to get the most clicks for your budget"
                      name="favorite"
                      onChange={() => {}}
                      value="cats"
                    />
                    <RadioButton
                      checked={false}
                      id="favoritePlants"
                      label="Custom"
                      subtext="You control how much to bid at auctions"
                      name="favorite"
                      onChange={() => {}}
                      value="plants"
                    />
                  </Flex>
                </Fieldset>
              ),
              summary: ['Custom'],
              title: 'Bid',
            },
          ]}
        />
        <Module.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample - preview"
          items={[
            {
              children: <Text> Preview table of changes here</Text>,
              summary: ['5 ad groups changing'],
              title: 'Preview bid changes',
            },
          ]}
        />
      </Flex>
    </Sheet>
  );
}

export default function FooterExample(): Node {
  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Box padding={8}>
        <Button text="View footer example" onClick={() => setShouldShow(true)} />
      </Box>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithFooter onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
