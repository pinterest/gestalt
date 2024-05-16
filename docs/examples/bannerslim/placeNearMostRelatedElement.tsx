import { ReactNode } from 'react';
import {
  Accordion,
  BannerSlim,
  Box,
  Checkbox,
  Divider,
  Fieldset,
  Flex,
  RadioButton,
  SelectList,
  Text,
  TextField,
} from 'gestalt';

export default function Example() {
  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }} width="100%">
        <Text size="500" weight="bold">
          Ads overview
        </Text>
        <Accordion id="doExample" title="Campaign optimization & delivery">
          <Flex direction="column" gap={{ column: 8, row: 0 }} width="100%">
            <TextField
              id="tag-readonly"
              label="Tag ID"
              onChange={() => {}}
              readOnly
              value="Tag 2022"
            />
            <SelectList
              id="selectList"
              label="Select conversion event"
              onChange={() => {}}
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
                  subtext="Pinterest aims to get the most clicks for your budget"
                  value="automatic"
                />
                <RadioButton
                  id="custom"
                  label="Custom"
                  name="custom"
                  onChange={() => {}}
                  subtext="You control how much to bid at auction"
                  value="custom"
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
            <BannerSlim
              iconAccessibilityLabel="Information"
              message="For best conversion campaign performance we recommend setting optimization & delivery at the campaign level so all ad groups have the same values, but you can set them individually."
              type="info"
            />
          </Flex>
        </Accordion>
      </Flex>
    </Box>
  );
}
