// @flow strict

import { type Node } from 'react';
import { Flex, Table, Text } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/js/tokens.js';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import { TokenExample } from '../components/TokenExample.js';
import Page from '../components/Page.js';

export type Token = {|
  name: string,
  value: string,
  darkValue?: string,
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
  { name: 'Border color', category: 'color-border', id: 'color-border' },
  { name: 'Elevation', category: 'elevation', id: 'elevation' },
];

const darkValueCategories = ['Background color', 'Elevation', 'Border color', 'Text color'];

const headers = ['CSS token name', 'Value', 'Dark mode value', 'Example'];

const tableHeaders = (category: string): Node => (
  <Table.Header>
    <Table.Row>
      {headers.map((header) => {
        if (header === 'Dark mode value' && !darkValueCategories.includes(category)) {
          return null;
        }
        return (
          <Table.HeaderCell key={`header-${header}`}>
            <Text weight="bold">{header}</Text>
          </Table.HeaderCell>
        );
      })}
    </Table.Row>
  </Table.Header>
);

export default function DesignTokensPage(): Node {
  return (
    <Page title="Design tokens guidelines">
      <PageHeader
        badge="pilot"
        name="Design tokens"
        description="Design tokens represent the values used within a design system to construct layouts and components, such as spacing and color. Because the tokens are an abstraction, the underlying value can change in different scenarios without affecting the designer or developer experience. [Learn more about Design Tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099)."
        showSourceLink={false}
      />
      <MainSection name="Token values">
        {tokenCategories.map((category) => (
          <MainSection.Subsection key={`table${category.name}`} title={category.name}>
            <Table accessibilityLabel={`${category.name} Values`}>
              {tableHeaders(category.name)}
              <Table.Body>
                {tokens
                  .filter((token) => token.name.includes(`${category.id}`))
                  .map((token: Token) => (
                    <Table.Row key={`token${token.name}`}>
                      <Table.Cell>
                        <Flex direction="column" gap={2}>
                          <Text>${token.name}</Text>
                          <Text color="subtle">{token.comment || ''}</Text>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>{token.value}</Text>
                      </Table.Cell>
                      {darkValueCategories.includes(category.name) && (
                        <Table.Cell>
                          <Text>{token.darkValue || '--'}</Text>
                        </Table.Cell>
                      )}
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
