// @flow strict

import type { Node } from 'react';
import { Box, Flex, Heading, Table, Text } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';
import { TokenExample } from '../components/TokenExample.js';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/js/token.js';

type Token = {|
  name: string,
  value: string,
  comment: string,
  category: string,
|};

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

const tokenCategories = [
  { name: 'Spacing', category: 'spacing', id: 'space' },
  { name: 'Background color', category: 'background-color', id: 'background' },
  { name: 'Text color', category: 'text-color', id: 'text' },
];

const tableHeaders = (
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
);

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
    {tokenCategories.map((category) => (
      <MainSection.Subsection title={category.name}>
        <Table accessibilityLabel={`${category.name} Values`}>
          {tableHeaders}
          <Table.Body>
            {tokens
              .filter((token) => token.name.includes(`${category.id}`))
              .map((token: Token) => (
                <Table.Row key={`token${token.name}`}>
                  <Table.Cell>
                    <Flex direction="column" gap={2}>
                      <Text>${token.name}</Text>
                      <Text color="gray">{token.comment || ''}</Text>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{token.name.replace(/-./g, (x) => x[1].toUpperCase())}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{token.value}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <TokenExample token={token} category={category.category} />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </MainSection.Subsection>
    ))}
  </MainSection>,
);

export default function TokensPage(): Node {
  return <CardPage cards={cards} page="Design Tokens" />;
}
