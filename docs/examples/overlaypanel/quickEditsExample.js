// @flow strict
import { Fragment, type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  Fieldset,
  FixedZIndex,
  Flex,
  Layer,
  Module,
  OverlayPanel,
  RadioButton,
  Text,
} from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const footer = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Flex alignItems="center" justifyContent="between">
          <Button color="transparent" text="Delete" />
          <Button color="red" text="Apply changes" onClick={onDismissStart} />
        </Flex>
      )}
    </OverlayPanel.DismissingElement>
  );

  return (
    <Fragment>
      <Box padding={8}>
        <Button text="View footer example" onClick={() => setShowComponent(true)} />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close"
            accessibilityLabel="Bulk edit for 5 ad groups of Nordstrom Account"
            heading="Editing 5 ad groups"
            onDismiss={() => setShowComponent(false)}
            footer={footer}
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
                      <Fieldset
                        legend="What bid campaign do you want to run?"
                        legendDisplay="hidden"
                      >
                        <Flex
                          direction="column"
                          gap={{
                            row: 0,
                            column: 2,
                          }}
                        >
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
          </OverlayPanel>
        </Layer>
      )}
    </Fragment>
  );
}
