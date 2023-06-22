// @flow strict
import { type Node } from 'react';
import { Badge, Box, Flex, IconButton, Link, Text, Tooltip } from 'gestalt';
import { useAppContext } from './appContext.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import Card from './Card.js';
import clipboardCopy from './clipboardCopy.js';
import Markdown from './Markdown.js';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js';

const unifyQuotes = (input: string): string => input.replace(/'/g, '"');

async function copyFlowType(code: string) {
  try {
    await clipboardCopy(code);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function isNumeric(value: string) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

const transformDefaultValue = (input: ?(number | string | boolean)) => {
  if (input === 'true') {
    return true;
  }
  if (input === 'false') {
    return false;
  }
  if (typeof input === 'string' && isNumeric(input)) {
    return parseFloat(input);
  }
  return input;
};

type Prop = {|
  defaultValue?: boolean | string | number | null,
  description?: string | $ReadOnlyArray<string>,
  href?: string,
  name: string,
  nullable?: boolean,
  required?: boolean,
  responsive?: boolean,
  type: string,
|};

const sortBy = (list: $ReadOnlyArray<Prop>, fn: (Prop) => string) =>
  [...list].sort((a, b) => fn(a).localeCompare(fn(b)));

function FormattedCode({ children }: {| children: Node |}) {
  return (
    <code>
      <pre style={{ margin: 0, overflowX: 'scroll', minWidth: 510 }}>{children}</pre>
    </code>
  );
}

function Description(lines: $ReadOnlyArray<string>): Node {
  return (
    <Flex
      alignItems="start"
      direction="column"
      gap={{
        row: 0,
        column: 2,
      }}
    >
      {lines.map((line) => (
        <Markdown key={line} text={line} textColor="subtle" />
      ))}
    </Flex>
  );
}

function Th({ children }: {| children?: Node |}) {
  return (
    <th style={{ borderBottom: '2px solid #ddd' }}>
      <Box padding={2}>
        <Text size="200" overflow="normal" weight="bold">
          {children}
        </Text>
      </Box>
    </th>
  );
}

function Td({
  border = true,
  children,
  colspan = 1,
  shrink = false,
  color = 'default',
}: {|
  border?: boolean,
  children?: Node,
  colspan?: number,
  shrink?: boolean,
  color?: 'default' | 'subtle',
|}) {
  return (
    <td
      style={{
        borderBottom: border ? '1px solid #ddd' : null,
        padding: 0,
        verticalAlign: 'top',
        width: shrink ? '1px' : null,
      }}
      colSpan={colspan}
    >
      <Box paddingX={2} marginTop={2} marginBottom={border ? 2 : 0}>
        <Text overflow="normal" color={color}>
          {children}
        </Text>
      </Box>
    </td>
  );
}

type Props = {|
  componentName: string,
  id?: string,
  name?: string,
  props: $ReadOnlyArray<Prop>,
|};

export default function PropTable({
  componentName,
  id = '',
  name: proptableName,
  props: properties,
}: Props): Node {
  const { propTableVariant, setPropTableVariant } = useAppContext();
  const propsId = `${id}Props`;

  return (
    <Card
      id={propsId}
      headingSize={proptableName ? '400' : '500'}
      name={proptableName ? `${proptableName} Props` : 'Props'}
      toggle={
        <Tooltip inline text={`${propTableVariant === 'expanded' ? 'Collapse' : 'Expand'} props`}>
          <IconButton
            icon={propTableVariant === 'expanded' ? 'minimize' : 'maximize'}
            accessibilityLabel={`${
              propTableVariant === 'expanded' ? 'Collapse' : 'Expand'
            } props for ${componentName || ''}`}
            iconColor="darkGray"
            size="xs"
            onClick={() =>
              setPropTableVariant(propTableVariant === 'expanded' ? 'collapsed' : 'expanded')
            }
          />
        </Tooltip>
      }
    >
      {propTableVariant === 'expanded' ? (
        <Box
          marginBottom={12}
          marginTop={4}
          overflow="auto"
          dangerouslySetInlineStyle={{ __style: { overflowY: 'hidden' } }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              tableLayout: 'auto',
            }}
          >
            <Box
              width={1}
              height={1}
              overflow="hidden"
              position="absolute"
              as="caption"
              dangerouslySetInlineStyle={{
                __style: { clip: 'rect(1px, 1px, 1px, 1px)', whiteSpace: 'nowrap' },
              }}
            >
              {proptableName ? `${proptableName} subcomponent props` : 'Component props'}
            </Box>

            <thead>
              <tr>
                {['Name', 'Type', 'Default'].map((item) => (
                  <Th key={item}>{item}</Th>
                ))}
              </tr>
            </thead>

            <tbody>
              {properties.length > 0 ? (
                sortBy(properties, ({ required, name }) => `${required ? 'a' : 'b'}${name}`).reduce(
                  (
                    acc,
                    {
                      defaultValue,
                      description = '',
                      href,
                      name,
                      required,
                      responsive,
                      nullable,
                      type,
                    },
                  ) => {
                    const propNameHasSecondRow = description || responsive;
                    const transformedDefaultValue = transformDefaultValue(defaultValue);
                    // $FlowFixMe[incompatible-use]
                    // $FlowFixMe[prop-missing]
                    acc.push(
                      <tr key={name}>
                        <Td shrink border={!propNameHasSecondRow}>
                          <Box
                            id={`${propsId}-${name}`}
                            dangerouslySetInlineStyle={{
                              __style: {
                                scrollMarginTop: 60,
                              },
                            }}
                          >
                            <Flex
                              gap={{
                                row: 2,
                                column: 0,
                              }}
                            >
                              <Text overflow="normal" underline={!!href}>
                                {href ? (
                                  <Link href={`#${href}`}>
                                    <code>{name}</code>
                                  </Link>
                                ) : (
                                  <code>{name}</code>
                                )}
                              </Text>
                              {required && <Badge text="Required" type="warning" />}
                            </Flex>
                          </Box>
                        </Td>

                        <Td border={!propNameHasSecondRow}>
                          <Flex justifyContent="between">
                            <FormattedCode>
                              {nullable ? `?${unifyQuotes(type)}` : unifyQuotes(type)}
                            </FormattedCode>

                            <IconButton
                              accessibilityLabel="Copy Flow type"
                              icon="copy-to-clipboard"
                              iconColor="darkGray"
                              onClick={() => {
                                trackButtonClick('Copy Flow type', `${componentName} - ${name}`);
                                copyFlowType(
                                  `$ElementType<React$ElementConfig<typeof ${componentName}>, '${name}'>`,
                                );
                              }}
                              size="xs"
                              tooltip={{
                                text: 'Copy Flow type',
                                inline: true,
                                idealDirection: 'up',
                                accessibilityLabel: '',
                              }}
                            />
                          </Flex>
                        </Td>

                        <Td
                          shrink
                          color={defaultValue != null ? 'default' : 'subtle'}
                          border={!propNameHasSecondRow}
                        >
                          {defaultValue != null ? (
                            <code>{JSON.stringify(transformedDefaultValue)}</code>
                          ) : (
                            '-'
                          )}
                        </Td>
                      </tr>,
                    );

                    if (propNameHasSecondRow) {
                      // $FlowFixMe[incompatible-use]
                      // $FlowFixMe[prop-missing]
                      acc.push(
                        <tr key={`${name}-second-row`}>
                          <Td colspan={1}>
                            {responsive && (
                              <Box marginTop={6}>
                                <Text>
                                  <code>
                                    sm{capitalizeFirstLetter(name)}, md{capitalizeFirstLetter(name)}
                                    , lg{capitalizeFirstLetter(name)}
                                  </code>
                                </Text>
                              </Box>
                            )}
                          </Td>
                          <Td colspan={1} color="default">
                            {description && (
                              <Box marginTop={6}>
                                {Array.isArray(description) ? (
                                  Description(description)
                                ) : (
                                  <Markdown text={description} textColor="default" />
                                )}
                              </Box>
                            )}
                          </Td>
                          <Td />
                        </tr>,
                      );
                    }
                    return acc;
                  },
                  [],
                )
              ) : (
                <tr>
                  <Td colspan={3} color="subtle">
                    No properties
                  </Td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      ) : (
        <Box marginBottom={8} />
      )}
    </Card>
  );
}
