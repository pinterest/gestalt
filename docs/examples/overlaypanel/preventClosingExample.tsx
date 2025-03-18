import { Fragment, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  OverlayPanel,
  RadioGroup,
  Text,
  TextField,
} from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const footer = (
    <OverlayPanel.DismissingElement>
      {({ onDismissStart }) => (
        <Flex alignItems="center" justifyContent="end">
          <Button color="red" onClick={onDismissStart} text="Create" />
        </Flex>
      )}
    </OverlayPanel.DismissingElement>
  );

  return (
    <Fragment>
      <Box padding={8}>
        <Button onClick={() => setShowComponent(true)} text="View OverlayPanel" />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close"
            accessibilityLabel="Example overlay panel for demonstration"
            closeOnOutsideClick={false}
            footer={footer}
            heading="Create new audience list"
            onDismiss={() => setShowComponent(false)}
            size="md"
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 12,
              }}
            >
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Box>
                  <Text inline weight="bold">
                    Step 1:
                  </Text>
                  <Text inline> Audience list details</Text>
                </Box>
                <TextField
                  id="name-your-audience"
                  label="Audience name"
                  onChange={() => {}}
                  placeholder="Name your audience"
                />
                <TextField
                  id="describe-your-audience"
                  label="Audience description"
                  onChange={() => {}}
                  placeholder="Describe your audience"
                />
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
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Box>
                  <Text inline weight="bold">
                    Step 2:
                  </Text>
                  <Text inline> Select conversion source</Text>
                </Box>
                <Text>
                  To use a conversion source other than a Pinterest Tag, add a filter and configure
                  the source of this event.
                </Text>
                <RadioGroup id="bidding" legend="Bidding">
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
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Box>
                  <Text inline weight="bold">
                    Step 3:
                  </Text>
                  <Text inline> Set a filter</Text>
                </Box>
                <TextField
                  id="past-users"
                  label="Users in the past few days"
                  onChange={() => {}}
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
          </OverlayPanel>
        </Layer>
      )}
    </Fragment>
  );
}
