// @flow strict
import type { Node, ComponentType } from 'react';
import { Badge, Box, Flex, IconButton, Link, Text, Tooltip } from 'gestalt';
import Card from './Card.js';
import { useAppContext } from './appContext.js';
import { capitalizeFirstLetter } from './utils.js';
import Markdown from './Markdown.js';

type Props = {|
  props: Array<{|
    defaultValue?: boolean | string | number | null,
    description?: string | Array<string>,
    href?: string,
    name: string,
    required?: boolean,
    responsive?: boolean,
    type: string,
  |}>,
  Component?: ComponentType<any>, // flowlint-line unclear-type:off
  name?: string,
  id?: string,
|};

const unifyQuotes = (input) => {
  return input?.replace(/'/g, '"');
};

const Description = (lines: Array<string>): Node => (
  <Flex alignItems="start" direction="column" gap={2}>
    {lines.map((line, idx) => (
      <Markdown key={idx} text={line} textColor="gray" />
    ))}
  </Flex>
);

const Th = ({ children }: {| children?: Node |}) => (
  <th style={{ borderBottom: '2px solid #ddd' }}>
    <Box padding={2}>
      <Text size="md" overflow="normal" weight="bold">
        {children}
      </Text>
    </Box>
  </th>
);

const Td = ({
  border = true,
  children,
  colspan = 1,
  shrink = false,
  color = 'darkGray',
}: {|
  border?: boolean,
  children?: Node,
  colspan?: number,
  shrink?: boolean,
  color?: 'darkGray' | 'gray',
|}) => (
  <td
    style={{
      verticalAlign: 'top',
      borderBottom: border && '1px solid #ddd',
      padding: 0,
      width: shrink ? '1px' : '',
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

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

const transformDefaultValue = (input) => {
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

const sortBy = (list, fn) => list.sort((a, b) => fn(a).localeCompare(fn(b)));

export default function PropTable({
  props: properties,
  name: proptableName,
  id = '',
  Component,
}: Props): Node {
  const { propTableVariant, setPropTableVariant } = useAppContext();
  const propsId = `${id}Props`;

  if (process.env.NODE_ENV === 'development' && Component) {
    const { displayName, propTypes } = Component; // eslint-disable-line react/forbid-foreign-prop-types
    const missingProps = Object.keys(propTypes || {}).reduce((acc, prop) => {
      if (!properties.find((p) => p.name === prop)) {
        return acc.concat(prop);
      }
      return acc;
    }, []);
    if (missingProps.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `${displayName || ''} is missing ${
          missingProps.length
        } PropTable definitions ${missingProps.join(', ')}`,
      );
    }
  }

  return (
    <Card
      id={propsId}
      name={proptableName ? `${proptableName} Props` : 'Props'}
      toggle={
        <Tooltip inline text={`${propTableVariant === 'expanded' ? 'Collapse' : 'Expand'} props`}>
          <IconButton
            icon={propTableVariant === 'expanded' ? 'minimize' : 'maximize'}
            accessibilityLabel={`${
              propTableVariant === 'expanded' ? 'Collapse' : 'Expand'
            } props for ${Component?.displayName || ''}`}
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
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Default</Th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                sortBy(properties, ({ required, name }) => `${required ? 'a' : 'b'}${name}`).reduce(
                  (
                    acc,
                    { defaultValue, description = '', href, name, required, responsive, type },
                    i,
                  ) => {
                    const propNameHasSecondRow = description || responsive;
                    const transformedDefaultValue = transformDefaultValue(defaultValue);
                    acc.push(
                      <tr key={i}>
                        <Td shrink border={!propNameHasSecondRow}>
                          <Box
                            id={`${propsId}-${name}`}
                            dangerouslySetInlineStyle={{
                              __style: {
                                scrollMarginTop: 60,
                              },
                            }}
                          >
                            <Flex gap={2}>
                              <Text overflow="normal" underline={!!href}>
                                {href ? (
                                  <Link href={`#${href}`}>
                                    <code>{name}</code>
                                  </Link>
                                ) : (
                                  <code>{name}</code>
                                )}
                              </Text>
                              {required && <Badge text="Required" />}
                            </Flex>
                          </Box>
                        </Td>
                        <Td border={!propNameHasSecondRow}>
                          <code>{unifyQuotes(type)}</code>
                        </Td>
                        <Td
                          shrink
                          color={defaultValue != null ? 'darkGray' : 'gray'}
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
                      acc.push(
                        <tr key={`${i}-second-row`}>
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
                          <Td colspan={1} color="darkGray">
                            {description && (
                              <Box marginTop={6}>
                                {Array.isArray(description) ? (
                                  Description(description)
                                ) : (
                                  <Markdown text={description} textColor="darkGray" />
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
                  <Td colspan={3} color="gray">
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
