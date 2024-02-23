// @flow strict
import { Fragment, type Node as ReactNode } from 'react';
import { Badge, Box, ColorSchemeProvider, Flex, Table, Text } from 'gestalt';
import { TokenExample } from './TokenExample';

function TableHeaders({ hasDarkValues }: { hasDarkValues: boolean }): ReactNode {
  const rows = ['CSS token name', 'Light mode', 'Dark mode'].map((header) => {
    if (header === 'Dark mode' && !hasDarkValues) {
      return null;
    }
    return (
      <Table.HeaderCell key={`header-${header}`}>
        <Text weight="bold">{header}</Text>
      </Table.HeaderCell>
    );
  });

  return (
    <Table.Header sticky>
      <Table.Row>{rows}</Table.Row>
    </Table.Header>
  );
}

function MetaData({ value, original }: { value?: string, original?: string }): ReactNode {
  const isCustom = original?.startsWith('#') || original?.startsWith('rgb');

  const isAlias = ['background', 'border', 'text', 'icon', 'data-visualization'].some((property) =>
    original?.includes(property),
  );

  const isBase = !isCustom && !isAlias;

  return (
    <Fragment>
      <Text size="100">{`value: ${value || '--'}`}</Text>
      <Flex gap={2}>
        <Flex.Item flex="grow">
          <Text size="100">{`original: ${original || '--'}`}</Text>
        </Flex.Item>
        {isBase && !!original && <Badge text="Base" type="neutral" />}
        {isAlias && <Badge text="Alias" type="neutral" />}
        {isCustom && (
          <Badge
            text="Custom"
            type="info"
            tooltip={{
              text: 'This token value is hard coded and does not map to a lower level token.',
              idealDirection: 'up',
            }}
          />
        )}
      </Flex>
    </Fragment>
  );
}

type Token = {
  name: string,
  value: string,
  darkValue?: string,
  originalValue: string,
  originalDarkValue?: string,
  comment?: string,
  category: string,
};

type Props = {
  name: string,
  id: string,
  darkValues: boolean,
  category: string,
  excludedItems?: $ReadOnlyArray<string>,
  data: $ReadOnlyArray<Token>,
};

export default function TokenTable({
  name,
  id,
  darkValues,
  category,
  excludedItems,
  data,
}: Props): ReactNode {
  return (
    <Table accessibilityLabel={`${name} values`} maxHeight={400}>
      <colgroup>
        <col span="1" style={{ width: '50%' }} />
        {darkValues ? (
          <Fragment>
            <col span="1" style={{ width: '25%' }} />
            <col span="1" style={{ width: '25%' }} />
          </Fragment>
        ) : (
          <col span="1" style={{ width: '50%' }} />
        )}
      </colgroup>

      <TableHeaders hasDarkValues={darkValues} />
      <Table.Body>
        {(excludedItems
          ? data.filter(
              ({ name: tokenName }) =>
                tokenName.startsWith(`${id}`) &&
                !excludedItems?.some((item) => tokenName.startsWith(`${id}-${item}`)),
            )
          : data
        ).map((token) => (
          <Table.Row key={`token${token.name}`}>
            <Table.Cell>
              <Flex height={100}>
                <Flex direction="column" gap={2}>
                  <Text>${token.name}</Text>
                  <Text color="subtle" size="100">
                    {token.comment || ''}
                  </Text>
                </Flex>
              </Flex>
            </Table.Cell>

            <Table.Cell>
              {darkValues ? (
                <ColorSchemeProvider colorScheme="light" id="light">
                  <Box color="default" padding={2} marginBottom={2} borderStyle="shadow">
                    <TokenExample token={token} category={category} />
                  </Box>
                </ColorSchemeProvider>
              ) : (
                <Box padding={2} marginBottom={2}>
                  <TokenExample token={token} category={category} />
                </Box>
              )}
              <MetaData value={token.value} original={token.originalValue} />
            </Table.Cell>

            {darkValues && (
              <Table.Cell>
                <ColorSchemeProvider colorScheme="dark" id="dark">
                  <Box color="default" padding={2} marginBottom={2} borderStyle="sm">
                    <TokenExample token={token} category={category} />
                  </Box>
                </ColorSchemeProvider>
                <MetaData value={token.darkValue} original={token.originalDarkValue || ''} />
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
