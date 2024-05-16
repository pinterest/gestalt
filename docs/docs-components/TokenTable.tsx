import { Fragment, ReactNode } from 'react';
import { Badge, Box, ColorSchemeProvider, Flex, Table, Text } from 'gestalt';
import tokensDark from 'gestalt-design-tokens/dist/js/tokens_dark';
import { TokenExample } from './TokenExample';

function TableHeaders({ hasDarkValues }: { hasDarkValues: boolean }) {
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
    <Table.Header>
      <Table.Row>{rows}</Table.Row>
    </Table.Header>
  );
}

function getReferenceTokenMap() {
  const darkTokenMap = new Map<
    string,
    {
      value: string;
      originalValue: string;
      darkModeSupport: boolean;
    }
  >();

  tokensDark.forEach((token) => {
    darkTokenMap.set(token.name, {
      value: token.value,
      originalValue: token.originalValue,
      // eslint-disable-next-line no-underscore-dangle
      darkModeSupport: token._darkModeSupport,
    });
  });

  return darkTokenMap;
}

function MetaData({
  value,
  original,
  darkModeSupport = true,
}: {
  value?: string;
  original?: string;
  darkModeSupport?: boolean;
}) {
  const isCustom = original?.startsWith('#') || original?.startsWith('rgb');

  const isAlias = ['background', 'border', 'text', 'icon', 'data-visualization'].some((property) =>
    original?.includes(property),
  );

  const isBase = !isCustom && !isAlias;
  const regex = /(?<=\D)\./g;
  return (
    <Fragment>
      <Text size="100">{`value: ${value || ''}`}</Text>
      <Flex gap={2}>
        <Flex.Item flex="grow">
          <Text size="100">{`original: ${
            original?.replace('.value', '').replace(regex, '-') || ''
          }`}</Text>
        </Flex.Item>
        {darkModeSupport && isBase && !!original && <Badge text="Base" type="neutral" />}
        {darkModeSupport && isAlias && <Badge text="Alias" type="neutral" />}
        {darkModeSupport && isCustom && (
          <Badge
            text="Custom"
            tooltip={{
              text: 'This token value is hard coded and does not map to a lower level token.',
              idealDirection: 'up',
            }}
            type="info"
          />
        )}
        {!darkModeSupport && (
          <Badge
            text="No dark theme"
            tooltip={{
              text: 'This token value is the same as the light mode.',
              idealDirection: 'up',
            }}
            type="info"
          />
        )}
      </Flex>
    </Fragment>
  );
}

type Token = {
  name: string;
  value: string;
  darkValue?: string;
  originalValue: string;
  originalDarkValue?: string;
  comment?: string;
  category: string;
};

type Props = {
  name: string;
  id: string;
  darkValues: boolean;
  category: string;
  excludedItems?: ReadonlyArray<string>;
  data: ReadonlyArray<Token>;
};

export default function TokenTable({ name, id, darkValues, category, excludedItems, data }: Props) {
  const tokenData = excludedItems
    ? data.filter(
        ({ name: tokenName }) =>
          tokenName.startsWith(`${id}`) &&
          !excludedItems?.some((item) => tokenName.startsWith(`${id}-${item}`)),
      )
    : data;

  const sortedTokens = [...tokenData].sort(({ name: tokenNameA }, { name: tokenNameB }) =>
    tokenNameA.localeCompare(tokenNameB),
  );

  const darkTokenMap = getReferenceTokenMap();

  return (
    <Table accessibilityLabel={`${name} values`}>
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
        {sortedTokens.map((token) => (
          <Table.Row key={`token${token.name}`}>
            <Table.Cell>
              <Flex height={100}>
                <Flex direction="column" gap={2}>
                  <Text>{token.name}</Text>
                  <Text color="subtle" size="100">
                    {token.comment || ''}
                  </Text>
                </Flex>
              </Flex>
            </Table.Cell>

            <Table.Cell>
              {darkValues ? (
                <ColorSchemeProvider colorScheme="light" id="light">
                  <Box borderStyle="shadow" color="default" marginBottom={2} padding={2}>
                    <TokenExample category={category} token={token} />
                  </Box>
                </ColorSchemeProvider>
              ) : (
                <Box marginBottom={2} padding={2}>
                  <TokenExample category={category} token={token} />
                </Box>
              )}
              <MetaData original={token.originalValue} value={token.value} />
            </Table.Cell>

            {darkValues && (
              <Table.Cell>
                <ColorSchemeProvider colorScheme="dark" id="dark">
                  <Box borderStyle="sm" color="default" marginBottom={2} padding={2}>
                    <TokenExample category={category} token={token} />
                  </Box>
                </ColorSchemeProvider>
                <MetaData
                  darkModeSupport={darkTokenMap.get(token.name)?.darkModeSupport}
                  original={darkTokenMap.get(token.name)?.originalValue || ''}
                  value={darkTokenMap.get(token.name)?.value}
                />
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
