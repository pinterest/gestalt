// @flow strict
import { Fragment, type Node, useReducer } from 'react';
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
  function reducer(
    state: {| heading: string, size: 'sm' | 'md' | 'lg' |} | { ... },
    action: {| type: 'small' | 'medium' | 'large' | 'none' |},
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
            text="Small OverlayPanel"
            onClick={() => {
              dispatch({ type: 'small' });
            }}
          />
        </Box>
        <Box padding={1}>
          <Button
            text="Medium OverlayPanel"
            onClick={() => {
              dispatch({ type: 'medium' });
            }}
          />
        </Box>
        <Box padding={1}>
          <Button
            text="Large OverlayPanel"
            onClick={() => {
              dispatch({ type: 'large' });
            }}
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
                <Button text="Apply changes" color="red" />
              </Flex>
            }
            heading={state.heading}
            onDismiss={() => {
              dispatch({ type: 'none' });
            }}
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
