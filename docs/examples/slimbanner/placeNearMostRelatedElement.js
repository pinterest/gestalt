// @flow strict
import { type Node } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Fieldset,
  Flex,
  Module,
  RadioButton,
  SelectList,
  SlimBanner,
  Text,
  TextField,
} from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8}>
      <Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
        <Text weight="bold" size="500">
          Ads overview
        </Text>
        <Module id="doExample" title="Campaign optimization & delivery">
          <Flex direction="column" width="100%" gap={{ column: 8, row: 0 }}>
            <TextField
              id="tag-readonly"
              label="Tag ID"
              onChange={() => {}}
              value="Tag 2022"
              readOnly
            />
            <SelectList
              id="selectList"
              onChange={() => {}}
              label="Select conversion event"
              size="lg"
            >
              <SelectList.Option label="Lead" value="Lead" />
            </SelectList>
            <Divider />
            <Fieldset legend="Bidding">
              <Flex direction="column" gap={{ column: 2, row: 0 }}>
                <RadioButton
                  checked
                  id="automatic"
                  label="Automatic (recommended)"
                  name="Automatic"
                  onChange={() => {}}
                  value="automatic"
                  subtext="Pinterest aims to get the most clicks for your budget"
                />
                <RadioButton
                  id="custom"
                  label="Custom"
                  name="custom"
                  onChange={() => {}}
                  value="custom"
                  subtext="You control how much to bid at auction"
                />
              </Flex>
            </Fieldset>
            <Divider />
            <Checkbox
              id="checkbox"
              label="I'll set the optimization & delivery by ad group instead"
              name="error"
              onChange={() => {}}
            />
            <SlimBanner
              type="info"
              message="For best conversion campaign performance we recommend setting optimization & delivery at the campaign level so all ad groups have the same values, but you can set them individually."
              iconAccessibilityLabel="Information"
            />
          </Flex>
        </Module>
      </Flex>
    </Box>
  );
}
