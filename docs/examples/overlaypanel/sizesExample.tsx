import { Fragment, useReducer } from 'react';
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
  function reducer(
    state:
      | {
          heading: string;
          size: 'sm' | 'md' | 'lg';
        }
      | Record<any, any>,
    action: {
      type: 'small' | 'medium' | 'large' | 'none';
    },
  ) {
    switch (action.type) {
      case 'small':
        return { heading: 'Small overlay panel', size: 'sm' };
      case 'medium':
        return { heading: 'Medium overlay panel', size: 'md' };
      case 'large':
        return { heading: 'Large overlay panel', size: 'lg' };
      case 'none':
        return {};
      default:
        throw new Error();
    }
  }
  const initialState = Object.freeze({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Fragment>
      <Box padding={8}>
        <Box padding={1}>
          <Button
            onClick={() => {
              dispatch({ type: 'small' });
            }}
            text="Small OverlayPanel"
          />
        </Box>
        <Box padding={1}>
          <Button
            onClick={() => {
              dispatch({ type: 'medium' });
            }}
            text="Medium OverlayPanel"
          />
        </Box>
        <Box padding={1}>
          <Button
            onClick={() => {
              dispatch({ type: 'large' });
            }}
            text="Large OverlayPanel"
          />
        </Box>
      </Box>
      {state.size && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Dismiss"
            accessibilityLabel="Example overlay panel to demonstrate different sizes"
            footer={
              <Flex justifyContent="end">
                <Button color="red" text="Apply changes" />
              </Flex>
            }
            heading={state.heading}
            onDismiss={() => {
              dispatch({ type: 'none' });
            }}
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"sm" | "md" | "lg" | undefined'.
            size={state.size}
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
                id="accordionExample - default"
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
