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

function SheetWithoutOutsideClick({ onDismiss }: {| onDismiss: () => void |}) {
  return (
    <Sheet
      accessibilityDismissButtonLabel="Close"
      accessibilitySheetLabel="Example sheet for demonstration"
      heading="Create new audience list"
      closeOnOutsideClick={false}
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
            label="Audience name"
            placeholder="Name your audience"
            id="name-your-audience"
            onChange={() => {}}
          />
          <TextField
            label="Audience description"
            placeholder="Describe your audience"
            id="describe-your-audience"
            onChange={() => {}}
          />
          <Fieldset legend="When adding this audience list to an ad group:">
            <Flex direction="column" gap={3}>
              <RadioButton
                id="include-list"
                label="Include list"
                name="audience"
                value="include"
                onChange={() => {}}
              />
              <RadioButton
                id="exclude-list"
                label="Exclude list"
                name="audience"
                value="include"
                onChange={() => {}}
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
                id="pinterest-tag"
                label="Pinterest Tag"
                name="source"
                value="pin"
                onChange={() => {}}
              />
              <RadioButton
                id="mobile-measurement"
                label="Mobile Measurement Partners (MMP)"
                name="source"
                value="mmp"
                onChange={() => {}}
              />
              <RadioButton
                id="conversion-upload"
                label="Conversion Upload"
                name="source"
                value="conversion"
                onChange={() => {}}
              />
              <RadioButton id="api" label="API" name="source" value="api" onChange={() => {}} />
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
            id="past-users"
            onChange={() => {}}
            label="Users in the past few days"
            placeholder="Ex. 4"
          />
          <Checkbox
            id="traffic"
            label="Include past traffic data"
            name="traffic"
            onChange={() => {}}
          />
        </Flex>
      </Flex>
    </Sheet>
  );
}

export default function PreventClosingExample(): Node {
  const [shouldShow, setShouldShow] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Box padding={8}>
        <Button text="View Sheet" onClick={() => setShouldShow(true)} />
      </Box>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithoutOutsideClick onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
