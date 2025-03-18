import {
  Accordion,
  BannerSlim,
  Box,
  Checkbox,
  Divider,
  Flex,
  RadioGroup,
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
