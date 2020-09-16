// @flow strict
import React, { type Node, type ComponentType } from 'react';
import { Box, Text, Icon, Link, Stack } from 'gestalt';
import Card from './Card.js';

type Props = {|
  props: Array<{|
    defaultValue?: Node,
    description?: string | Array<string>,
    href?: string,
    name: string,
    required?: boolean,
    responsive?: boolean,
    type: string,
  |}>,
  showHeading?: boolean,
  Component?: ComponentType<any>, // flowlint-line unclear-type:off
|};

const buildDescription = (lines: Array<string>): Node => (
  <Stack gap={2}>
    {lines.map((line, idx) => (
      <Text key={idx} color="gray">
        {line}
      </Text>
    ))}
  </Stack>
);

const Th = ({ children }: {| children?: Node |}) => (
  <th style={{ borderBottom: '2px solid #ddd' }}>
    <Box padding={2}>
      <Text size="md" color="gray" overflow="normal" weight="bold">
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

const upcase = string => string.charAt(0).toUpperCase() + string.slice(1);
const sortBy = (list, fn) => list.sort((a, b) => fn(a).localeCompare(fn(b)));

export default function PropTable({
  props: properties,
  Component,
  showHeading,
}: Props): Node {
  const hasRequired = properties.some(prop => prop.required);

  if (process.env.NODE_ENV === 'development' && Component) {
    // $FlowIssue[prop-missing]
    const { displayName, propTypes } = Component; // eslint-disable-line react/forbid-foreign-prop-types
    const missingProps = Object.keys(propTypes || {}).reduce((acc, prop) => {
      if (!properties.find(p => p.name === prop)) {
        return acc.concat(prop);
      }
      return acc;
    }, []);
    if (missingProps.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `${displayName || ''} is missing ${
          missingProps.length
        } PropTable definitions ${missingProps.join(', ')}`
      );
    }
  }

  return (
    <Card id="Props" name="Props" showHeading={showHeading}>
      <Box
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
              {hasRequired && <Th />}
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Default</Th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              sortBy(
                properties,
                ({ required, name }) => `${required ? 'a' : 'b'}${name}`
              ).reduce(
                (
                  acc,
                  {
                    defaultValue,
                    description,
                    href,
                    name,
                    required,
                    responsive,
                    type,
                  },
                  i
                ) => {
                  acc.push(
                    <tr key={i}>
                      {hasRequired && (
                        <Td shrink border={!description}>
                          {required && (
                            <Box paddingY={1}>
                              <Icon
                                icon="check-circle"
                                size={16}
                                color="darkGray"
                                accessibilityLabel={`Property ${name} is required`}
                              />
                            </Box>
                          )}
                        </Td>
                      )}
                      <Td shrink border={!description}>
                        <Box>
                          <Text overflow="normal" weight="bold">
                            {href ? (
                              <Link href={`#${href}`}>
                                <code>{name}</code>
                              </Link>
                            ) : (
                              <code>{name}</code>
                            )}
                          </Text>
                        </Box>
                        {responsive && (
                          <Box>
                            <Text>
                              <code>
                                sm{upcase(name)}, md{upcase(name)}, lg
                                {upcase(name)}
                              </code>
                            </Text>
                          </Box>
                        )}
                      </Td>
                      <Td border={!description}>
                        <code>{type}</code>
                      </Td>
                      <Td
                        shrink
                        color={defaultValue != null ? 'darkGray' : 'gray'}
                        border={!description}
                      >
                        {defaultValue != null ? (
                          <code>{JSON.stringify(defaultValue)}</code>
                        ) : (
                          '-'
                        )}
                      </Td>
                    </tr>
                  );
                  if (description) {
                    acc.push(
                      <tr key={`${i}-description`}>
                        <Td colspan={hasRequired ? 2 : 1} />
                        <Td colspan={2} color="gray">
                          {Array.isArray(description)
                            ? buildDescription(description)
                            : description}
                        </Td>
                      </tr>
                    );
                  }
                  return acc;
                },
                []
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
    </Card>
  );
}
