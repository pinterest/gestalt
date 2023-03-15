// @flow strict
import { type Node, useState } from 'react';
import { Checkbox, Fieldset, Flex, Heading, Link, Text } from 'gestalt';

export default function Example(): Node {
  const [checkedSell, setCheckedSell] = useState(false);
  const [checkedLeads, setCheckedLeads] = useState(false);
  const [checkedAudience, setCheckedAudience] = useState(false);
  const [checkedBrand, setCheckedBrand] = useState(false);
  const [checkedNotSure, setCheckedNotSure] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Heading size="400">Company Account Goals</Heading>
          <Text size="200">
            Choose up to 3.{' '}
            <Text inline size="200" weight="bold">
              <Link display="inline" target="blank" href="#">
                Learn more
              </Link>
            </Text>
          </Text>
        </Flex>
        <Fieldset legend="Choose up to 3 company account goals" legendDisplay="hidden">
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            <Checkbox
              checked={checkedSell}
              id="sell"
              label="Sell more products"
              name="account goals"
              onChange={({ checked }) => {
                setCheckedSell(checked);
              }}
            />
            <Checkbox
              checked={checkedLeads}
              id="leads"
              label="Generate more leads"
              name="account goals"
              onChange={({ checked }) => {
                setCheckedLeads(checked);
              }}
            />
            <Checkbox
              checked={checkedAudience}
              id="audience"
              label="Attract an audience"
              name="account goals"
              onChange={({ checked }) => {
                setCheckedAudience(checked);
              }}
            />
            <Checkbox
              checked={checkedBrand}
              id="brand"
              label="Increase brand awareness"
              name="account goals"
              onChange={({ checked }) => {
                setCheckedBrand(checked);
              }}
            />
            <Checkbox
              checked={checkedNotSure}
              id="notSure"
              label="Not sure yet"
              name="account goals"
              onChange={({ checked }) => {
                setCheckedNotSure(checked);
              }}
            />
          </Flex>
        </Fieldset>
      </Flex>
    </Flex>
  );
}
