// @flow
import * as React from 'react';
import { Box, Text, Icon, Link } from 'gestalt';

type Props = {|
  props: Array<{|
    defaultValue?: any,
    description?: ?string,
    href: ?string,
    name: string,
    required?: boolean,
    responsive?: boolean,
    type: string,
  |}>,
  Component?: React.ComponentType<any>,
|};

const Th = ({ children }: {| children?: React.Node |}) => (
  <th style={{ borderBottom: '2px solid #EFEFEF' }}>
    <Box padding={2}>
      <Text bold size="sm" color="gray" overflow="normal">
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
}: {
  border?: boolean,
  children?: React.Node,
  colspan?: number,
  shrink?: boolean,
  color?: 'darkGray' | 'gray',
}) => (
  <td
    style={{
      verticalAlign: 'top',
      borderBottom: border && '1px solid #EFEFEF',
      padding: 0,
      width: shrink ? '1px' : '',
    }}
    colSpan={colspan}
  >
    <Box paddingX={2} marginTop={2} marginBottom={border ? 2 : 0}>
      <Text overflow="normal" leading="tall" color={color}>
        {children}
      </Text>
    </Box>
  </td>
);

const upcase = string => string.charAt(0).toUpperCase() + string.slice(1);
const sortBy = (list, fn) => list.sort((a, b) => fn(a).localeCompare(fn(b)));

export default function PropTable({ props: properties, Component }: Props) {
  const hasRequired = properties.some(prop => prop.required);

  if (process.env.NODE_ENV === 'development' && Component) {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { displayName, propTypes } = Component;
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
    <Box overflow="auto">
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
                        <Text overflow="normal" bold leading="tall">
                          {href ? (
                            <Link
                              href={`#${href}`}
                              onClick={({ event }) => {
                                event.preventDefault();
                                const elem = document.getElementById(href);
                                if (elem) {
                                  elem.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                  });
                                }
                              }}
                            >
                              <code>{name}</code>
                            </Link>
                          ) : (
                            <code>{name}</code>
                          )}
                        </Text>
                      </Box>
                      {responsive && (
                        <Box>
                          <Text leading="tall">
                            <code>
                              sm{upcase(name)}, md{upcase(name)}, lg{upcase(
                                name
                              )}
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
                      overflow="normal"
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
                      <Td colspan={2} overflow="normal" color="gray">
                        {description}
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
  );
}
