// @flow strict

import type { Node } from 'react';
import { Flex, Table, Text } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/js/tokens.js';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import { TokenExample } from '../components/TokenExample.js';
import Page from '../components/Page.js';

type Token = {|
  name: string,
  value: string,
  comment?: string,
  category: string,
|};

const tokenCategories = [
  { name: 'Spacing', category: 'spacing', id: 'space' },
  { name: 'Background color', category: 'background-color', id: 'background' },
  { name: 'Text color', category: 'text-color', id: 'text' },
  { name: 'Font size', category: 'font-size', id: 'font-size' },
  { name: 'Font weight', category: 'font-weight', id: 'font-weight' },
  { name: 'Font family', category: 'font-family', id: 'font-family' },
];

const headers = ['CSS Token Name', 'JavaScript Prop Name', 'Value', 'Example'];

const tableHeaders = (
  <Table.Header>
    <Table.Row>
      {headers.map((header) => (
        <Table.HeaderCell key={`header-${header}`}>
          <Text weight="bold">{header}</Text>
        </Table.HeaderCell>
      ))}
    </Table.Row>
  </Table.Header>
);

export default function DesignTokensPage(): Node {
  return (
    <Page title="Design Tokens Guidelines">
      <PageHeader
        badge="pilot"
        name="Design Tokens"
        description="Design tokens represent the values used within a design system to construct layouts and components, such as spacing and color. Because the tokens are an abstraction, the underlying value can change in different scenarios without affecting the designer or developer experience. [Learn more about Design Tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099)."
        showSourceLink={false}
      />
      <MainSection name="Token Values">
        {tokenCategories.map((category) => (
          <MainSection.Subsection key={`table${category.name}`} title={category.name}>
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
      </MainSection>
    </Page>
  );
}
