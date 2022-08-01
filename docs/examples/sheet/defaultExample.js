// @flow strict
import React, { type Node } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  Fieldset,
  FixedZIndex,
  Flex,
  Layer,
  RadioButton,
  Sheet,
  Text,
  TextField,
} from 'gestalt';

function SheetWithAccessibilityLabels({ onDismiss }: {| onDismiss: () => void |}) {
  return (
    <Sheet
      accessibilityDismissButtonLabel="Close audience creation sheet"
      accessibilitySheetLabel="Audience list creation for new campaign"
      heading="Create a new audience list"
      onDismiss={onDismiss}
      // eslint-disable-next-line react/no-unstable-nested-components
      footer={({ onDismissStart }) => (
        <Flex alignItems="center" justifyContent="end">
          <Button color="red" text="Create" onClick={onDismissStart} />
        </Flex>
      )}
      size="md"
    >
      <Flex direction="column" gap={12}>
        <Flex direction="column" gap={4}>
          <Box>
            <Text inline weight="bold">
              Step 1:
            </Text>
            <Text inline> Audience list details</Text>
          </Box>
          <TextField
            id="audience-name"
            label="Audience name"
            placeholder="Name your audience"
            onChange={() => {}}
          />
          <TextField
            id="desc"
            label="Audience description"
            placeholder="Describe your audience"
            onChange={() => {}}
          />
          <Fieldset legend="When adding this audience list to an ad group:">
            <Flex direction="column" gap={3}>
              <RadioButton
                label="Include list"
                name="audience"
                value="include"
                onChange={() => {}}
                id="include"
              />
              <RadioButton
                label="Exclude list"
                name="audience"
                value="include"
                onChange={() => {}}
                id="exclude"
              />
            </Flex>
          </Fieldset>
        </Flex>
        <Flex direction="column" gap={4}>
          <Box>
            <Text inline weight="bold">
              Step 2:
            </Text>
            <Text inline> Select conversion source</Text>
          </Box>
          <Text>
            To use a conversion source other than a Pinterest Tag, add a filter and configure the
            source of this event.
          </Text>
          <Fieldset legend="Select conversion source:" legendDisplay="hidden">
            <Flex direction="column" gap={3}>
              <RadioButton
                label="Pinterest Tag"
                name="source"
                value="pin"
                onChange={() => {}}
                id="tag"
              />
              <RadioButton
                label="Mobile Measurement Partners (MMP)"
                name="source"
                value="mmp"
                onChange={() => {}}
                id="mmp"
              />
              <RadioButton
                label="Conversion Upload"
                name="source"
                value="conversion"
                onChange={() => {}}
                id="upload"
              />
              <RadioButton label="API" name="source" value="api" onChange={() => {}} id="api" />
            </Flex>
          </Fieldset>
        </Flex>
        <Flex direction="column" gap={4}>
          <Box>
            <Text inline weight="bold">
              Step 3:
            </Text>
            <Text inline> Set a filter</Text>
          </Box>
          <TextField
            id="users"
            label="Users in the past few days"
            placeholder="Ex. 4"
            onChange={() => {}}
          />
          <Checkbox
            label="Include past traffic data"
            name="traffic"
            id="traffic"
            onChange={() => {}}
          />
        </Flex>
      </Flex>
    </Sheet>
  );
}

export default function AccessibilityExample(): Node {
  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Box padding={8}>
        <Button text="View example Sheet" onClick={() => setShouldShow(true)} />
      </Box>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithAccessibilityLabels onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
