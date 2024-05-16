import { Fragment, useState } from 'react';
import {
  Accordion,
  Box,
  Button,
  CompositeZIndex,
  Fieldset,
  FixedZIndex,
  Flex,
  Layer,
  OverlayPanel,
  RadioButton,
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
              {/* @ts-expect-error - TS2739 - Type '{ expandedIndex: number; id: string; items: { children: Element; summary: string[]; title: string; }[]; }' is missing the following properties from type 'AccordionExpandableProps': accessibilityCollapseLabel, accessibilityExpandLabel */}
              <Accordion.Expandable
                expandedIndex={0}
                id="AccordionExample - default"
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
                            name="favorite"
                            onChange={() => {}}
                            subtext="Pinterest aims to get the most clicks for your budget"
                            value="cats"
                          />
                          <RadioButton
                            checked={false}
                            id="favoritePlants"
                            label="Custom"
                            name="favorite"
                            onChange={() => {}}
                            subtext="You control how much to bid at auctions"
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
              {/* @ts-expect-error - TS2739 - Type '{ id: string; items: { children: Element; summary: string[]; title: string; }[]; }' is missing the following properties from type 'AccordionExpandableProps': accessibilityCollapseLabel, accessibilityExpandLabel */}
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
