// @flow strict

import { type Node as ReactNode } from 'react';
import { Flex, Table, Text } from 'gestalt';
import dataVizTokens from 'gestalt-design-tokens/dist/js/data-viz-tokens';
import tokens from 'gestalt-design-tokens/dist/js/tokens';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import { TokenExample } from '../../../docs-components/TokenExample';

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
    excludedItems: ['box', 'tag', 'button', 'overlay'],
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
            <Table accessibilityLabel={`${name} Values`}>
              <TableHeaders hasDarkValues={darkValues} />
              <Table.Body>
                {allTokens
                  .filter(
                    ({ name: tokenName }) =>
                      tokenName.startsWith(`${id}`) &&
                      excludedItems?.some((item) => tokenName.startsWith(`${id}-${item}`)),
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
