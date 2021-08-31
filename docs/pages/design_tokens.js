// @flow strict
import type { Node } from 'react';
import { Table, Text, Box } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    badge="pilot"
    name="Design Tokens"
    description="Design tokens represent the values used within a design system to construct layouts and components, such as spacing and color. Because the tokens are an abstraction, the underlying value can change in different scenarios without affecting the designer or developer experience. [Learn more about Design Tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099)."
    showSourceLink={false}
  />,
);

card(
  <MainSection name="Token Values">
    <MainSection.Subsection title="Spacing">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">CSS Token Name</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">JavaScript Prop Name</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Value</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Example</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>--space-0</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space0</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>0px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-100</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space100</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>4px</Text>
            </Table.Cell>
            <Table.Cell>
              <Box color="eggplant" width="4px" height="4px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>8px</Text>
            </Table.Cell>
            <Table.Cell>
              <Box color="eggplant" width="8px" height="8px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-300</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space300</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>16px</Text>
            </Table.Cell>
            <Table.Cell>
              <Box color="eggplant" width="16px" height="16px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-400</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space400</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>24px</Text>
            </Table.Cell>
            <Table.Cell>
              <Box color="eggplant" width="24px" height="24px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-500</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space500</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>32px</Text>
            </Table.Cell>
            <Table.Cell>
              <Box color="eggplant" width="32px" height="32px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-600</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>space600</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>64px</Text>
            </Table.Cell>
            <Table.Cell>
              <Box color="eggplant" width="64px" height="64px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-negative-100</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>spaceNegative100</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>-4px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-negative-200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>spaceNegative200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>-8px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-negative-300</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>spaceNegative300</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>-16px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-negative-400</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>spaceNegative400</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>-24px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-negative-500</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>spaceNegative500</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>-32px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>--space-negative-600</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>spaceNegative600</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>-64px</Text>
            </Table.Cell>
            <Table.Cell>{null}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </MainSection.Subsection>
  </MainSection>,
);

export default function TokensPage(): Node {
  return <CardPage cards={cards} page="Design Tokens" />;
}
