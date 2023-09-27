// @flow strict

import { type Node } from 'react';
import { Flex, Table, Text } from 'gestalt';
import dataVizTokens from 'gestalt-design-tokens/dist/js/data-viz-tokens.js';
import tokens from 'gestalt-design-tokens/dist/js/tokens.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import { TokenExample } from '../../docs-components/TokenExample.js';

export type Token = {|
  name: string,
  value: string,
  darkValue?: string,
  comment?: string,
  category: string,
|};

const tokenCategories = [
  {
    name: 'Background color',
    category: 'background-color',
    id: 'background',
    infoPage: { name: 'Box', path: 'web/box#Colors' },
  },
  {
    name: 'Border color',
    category: 'color-border',
    id: 'color-border',
    infoPage: { name: 'Box', path: 'web/box#Borders' },
  },

  {
    name: 'Data visualization',
    category: 'data-visualization',
    id: 'data-visualization',
    infoPage: {
      name: 'Data Visualization Guidelines',
      path: 'foundations/data_visualization/color/palette',
    },
  },
  {
    name: 'Elevation',
    category: 'elevation',
    id: 'elevation',
    infoPage: { name: 'Box', path: 'web/box#Elevation' },
  },
  {
    name: 'Font size',
    category: 'font-size',
    id: 'font-size',
    infoPage: { name: 'Text', path: 'web/text#Sizes' },
  },
  {
    name: 'Font weight',
    category: 'font-weight',
    id: 'font-weight',
    infoPage: { name: 'Text', path: 'web/text#Styles' },
  },
  {
    name: 'Font family',
    category: 'font-family',
    id: 'font-family',
    infoPage: { name: 'Typography', path: 'foundations/typography/guidelines' },
  },
  {
    name: 'Opacity',
    category: 'opacity',
    id: 'opacity',
    infoPage: { name: 'Box', path: 'web/box#Opacity' },
  },
  {
    name: 'Spacing',
    category: 'spacing',
    id: 'space',
    infoPage: { name: 'Box', path: 'web/box#Responsive-padding' },
  },
  {
    name: 'Text color',
    category: 'text-color',
    id: 'color-text',
    infoPage: { name: 'Text', path: 'web/text#Colors' },
  },
];

const darkValueCategories = [
  'Background color',
  'Elevation',
  'Border color',
  'Text color',
  'Data visualization',
];

const headers = ['CSS token name', 'Value', 'Dark mode value', 'Example'];

// Due to funky javascript sorting of keys, this is needed to show numbers 01-12 in order
const sortedDataTokens = dataVizTokens.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: 'base',
  }),
);

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
        name="Design tokens"
        description="Design tokens represent the values used within a design system to construct layouts and components, such as spacing and color. Because the tokens are an abstraction, the underlying value can change in different scenarios without affecting the designer or developer experience. [Learn more about Design Tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099)."
        type="guidelines"
      />
      <MainSection name="Token values">
        {tokenCategories.map((category) => {
          const tokensToUse = category.name === 'Data visualization' ? sortedDataTokens : tokens;
          return (
            <MainSection.Subsection
              key={`table${category.name}`}
              title={category.name}
              description={`Visit the [${category?.infoPage?.name} page](/${category?.infoPage?.path}) for guidelines and implementation details.`}
            >
              <Table accessibilityLabel={`${category.name} Values`}>
                {tableHeaders(category.name)}
                <Table.Body>
                  {(tokensToUse: $ReadOnlyArray<Token>)
                    .filter(
                      (token) =>
                        token.name.includes(`${category.id}`) && !token.name.includes(`disabled`),
                    )
                    .map((token: Token) => (
                      <Table.Row key={`token${token.name}`}>
                        <Table.Cell>
                          <Flex
                            direction="column"
                            gap={{
                              row: 0,
                              column: 2,
                            }}
                          >
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
          );
        })}
      </MainSection>
    </Page>
  );
}
