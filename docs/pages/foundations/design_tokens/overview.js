// @flow strict

import { type Node as ReactNode } from 'react';
import { Flex, Table, Text } from 'gestalt';
import dataVizTokens from 'gestalt-design-tokens/dist/js/data-viz-tokens';
import tokens from 'gestalt-design-tokens/dist/js/tokens';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import { TokenExample } from '../../../docs-components/TokenExample';

const EXCLUSION_LIST = [
  'avatar',
  'badge',
  'box',
  'button',
  'combobox',
  'datepicker',
  'formfield',
  'overlay',
  'popover',
  'segmentedcontrol',
  'switch',
  'tag',
  'table',
  'tableofcontents',
  'tagdata',
  'tiledata',
  'video',
];

const tokenCategories: $ReadOnlyArray<{
  name: string,
  category: string,
  id: string,
  infoPage: { name: string, path: string },
  darkValues: boolean,
  excludedItems?: $ReadOnlyArray<string>,
}> = [
  {
    name: 'Background color',
    category: 'color-background',
    id: 'color-background',
    infoPage: { name: 'Box', path: 'web/box#Colors' },
    darkValues: true,
    excludedItems: EXCLUSION_LIST,
  },
  {
    name: 'Border color',
    category: 'color-border',
    id: 'color-border',
    infoPage: { name: 'Box', path: 'web/box#Borders' },
    darkValues: true,
  },
  {
    name: 'Text color',
    category: 'color-text',
    id: 'color-text',
    infoPage: { name: 'Text', path: 'web/text#Colors' },
    darkValues: true,
  },
  {
    name: 'Icon color',
    category: 'color-icon',
    id: 'color-icon',
    infoPage: { name: 'Pog', path: 'web/pog#Variants' },
    darkValues: true,
  },
  {
    name: 'Data visualization color',
    category: 'color-data-visualization',
    id: 'color-data-visualization',
    infoPage: {
      name: 'Data Visualization Guidelines',
      path: 'foundations/data_visualization/color/palette',
    },
    darkValues: true,
  },
  {
    name: 'Elevation',
    category: 'elevation',
    id: 'elevation',
    infoPage: { name: 'Box', path: 'web/box#Elevation' },
    darkValues: true,
  },
  {
    name: 'Font size',
    category: 'font-size',
    id: 'font-size',
    infoPage: { name: 'Text', path: 'web/text#Sizes' },
    darkValues: false,
  },
  {
    name: 'Font weight',
    category: 'font-weight',
    id: 'font-weight',
    infoPage: { name: 'Text', path: 'web/text#Styles' },
    darkValues: false,
  },
  {
    name: 'Font family',
    category: 'font-family',
    id: 'font-family',
    infoPage: { name: 'Typography', path: 'foundations/typography' },
    darkValues: false,
  },
  {
    name: 'Opacity',
    category: 'opacity',
    id: 'opacity',
    infoPage: { name: 'Box', path: 'web/box#Opacity' },
    darkValues: false,
  },
  {
    name: 'Spacing',
    category: 'spacing',
    id: 'space',
    infoPage: { name: 'Box', path: 'web/box#Responsive-padding' },
    darkValues: false,
  },
  {
    name: 'Rounding',
    category: 'rounding',
    id: 'rounding',
    infoPage: { name: 'Box', path: 'web/box#Rounding' },
    darkValues: false,
  },
];

export type Token = {
  name: string,
  value: string,
  darkValue?: string,
  comment?: string,
  category: string,
};

function TableHeaders({ hasDarkValues }: { hasDarkValues: boolean }): ReactNode {
  const rows = ['CSS token name', 'Value', 'Dark mode value', 'Example'].map((header) => {
    if (header === 'Dark mode value' && !hasDarkValues) {
      return null;
    }
    return (
      <Table.HeaderCell key={`header-${header}`}>
        <Text weight="bold">{header}</Text>
      </Table.HeaderCell>
    );
  });

  return (
    <Table.Header>
      <Table.Row>{rows}</Table.Row>
    </Table.Header>
  );
}

const dataVizColorTokens: $ReadOnlyArray<Token> = dataVizTokens.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: 'base',
  }),
);

const allTokens: $ReadOnlyArray<Token> = tokens;

export default function DesignTokensPage(): ReactNode {
  return (
    <Page title="Design tokens guidelines">
      <PageHeader
        name="Design tokens"
        description={`
Design tokens represent the values used within a design system to construct layouts and components, such as spacing and color. Because the tokens are an abstraction, the underlying value can change in different scenarios without affecting the designer or developer experience. [Learn more about Design Tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099).

The design color tokens on this section, those that start with \`$color-\` are alias (or semantic tokens) as they give semantic usage information through their name. They point to Gestalt's base color tokens (hence the name "alias"). To learn more about the complete set of Gestalt's base color tokens, read our [extended color palette section](http://localhost:8888/foundations/color/palette#Extended-palette).
        `}
        type="guidelines"
      />
      <MainSection name="Token values">
        {tokenCategories.map(({ name, id, darkValues, infoPage, category, excludedItems }) => (
          <MainSection.Subsection
            key={`table${name}`}
            title={name}
            description={`
Visit the [${infoPage?.name} page](/${infoPage?.path}) for guidelines and usage.`}
          >
            <Table accessibilityLabel={`${name} values`}>
              <TableHeaders hasDarkValues={darkValues} />
              <Table.Body>
                {(name === 'Data visualization' ? dataVizColorTokens : allTokens)
                  .filter(
                    ({ name: tokenName }) =>
                      tokenName.startsWith(`${id}`) &&
                      !excludedItems?.some((item) => tokenName.startsWith(`${id}-${item}`)),
                  )
                  .map((token) => (
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
                      {darkValues && (
                        <Table.Cell>
                          <Text>{token.darkValue || '--'}</Text>
                        </Table.Cell>
                      )}
                      <Table.Cell>
                        <TokenExample token={token} category={category} />
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
