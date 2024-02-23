// @flow strict

import { type Node as ReactNode } from 'react';
import { Flex, Table, Text } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/js/tokens';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import { TokenExample } from '../../../docs-components/TokenExample';

const tokenCategories: $ReadOnlyArray<{
  name: string,
  category: string,
  id: string,
  darkValues: boolean,
}> = [
  {
    name: 'Background color',
    category: 'color-background',
    id: 'color-background',
    darkValues: true,
  },
  {
    name: 'Border color',
    category: 'color-border',
    id: 'color-border',
    darkValues: true,
  },
  {
    name: 'Text color',
    category: 'color-text',
    id: 'color-text',
    darkValues: true,
  },
  {
    name: 'Icon color',
    category: 'color-icon',
    id: 'color-icon',
    darkValues: true,
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

const allTokens: $ReadOnlyArray<Token> = tokens;

const components = [
  'avatar',
  'badge',
  'box',
  'button',
  'combobox',
  'datepicker',
  'formfield',
  'mask',
  'overlay',
  'popover',
  'pulsar',
  'segmentedcontrol',
  'switch',
  'tabs',
  'tag',
  'table',
  'tableofcontents',
  'tagdata',
  'tiledata',
  'video',
];

export default function DesignTokensPage(): ReactNode {
  return (
    <Page title="Design component tokens">
      <PageHeader
        name="Component tokens"
        description="Component tokens are under development. We do not recommend their direct consumption as they will be subject to change and documented as minor/patch releases"
        type="guidelines"
      />
      {components.map((cmp) => (
        <MainSection key={cmp} name={cmp.charAt(0).toUpperCase() + cmp.slice(1)}>
          {tokenCategories.map(({ name, id, darkValues, category }) => {
            const existingTokens = allTokens.filter(({ name: tokenName }) =>
              tokenName.startsWith(`${id}-${cmp}-`),
            );

            return existingTokens.length > 0 ? (
              <MainSection.Subsection key={`table${cmp}${name}`} title={`${category}-${cmp}`}>
                <Table accessibilityLabel={`${cmp}'s ${name} values`}>
                  <TableHeaders hasDarkValues={darkValues} />
                  <Table.Body>
                    {existingTokens.map((token) => (
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
            ) : null;
          })}
        </MainSection>
      ))}
    </Page>
  );
}
