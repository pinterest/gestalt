import React from 'react';
import Box from '../../../src/Box/Box';
import Text from '../../../src/Text/Text';
import Icon from '../../../src/Icon/Icon';

const Th = ({ children }) => (
  <th style={{ borderBottom: '2px solid #EFEFEF' }}>
    <Box padding={2}>
      <Text bold size="sm" color="gray" overflow="normal">
        {children}
      </Text>
    </Box>
  </th>
);

const Td = ({ border = true, children, colspan, shrink = false, ...props }) => (
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
      <Text
        size="sm"
        overflow="normal"
        __dangerouslyIncreaseLineHeight
        {...props}
      >
        {children}
      </Text>
    </Box>
  </td>
);

const upcase = ([first, ...rest]) => [first.toUpperCase(), ...rest].join('');
const sortBy = (list, fn) => list.sort((a, b) => fn(a).localeCompare(fn(b)));

export default ({ props, Component }) => {
  const hasRequired = props.some(prop => prop.required);
  const hasDescription = props.some(prop => prop.description);

  if (process.env.NODE_ENV === 'dev' && Component) {
    const { displayName, propTypes } = Component;
    const missingProps = Object.keys(propTypes || []).reduce((acc, prop) => {
      if (!props.find(p => p.name === prop)) {
        return acc.concat(prop);
      }
      return acc;
    }, []);
    if (missingProps.length > 0) {
      console.warn(
        `${displayName} is missing ${
          missingProps.length
        } PropTable definitions ${missingProps.join(', ')}`
      );
    }
  }

  return (
    <Box overflow="scrollX">
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
          {props.length > 0 ? (
            sortBy(
              props,
              ({ required, name }) => `${required ? 'a' : 'b'}${name}`
            ).reduce(
              (
                acc,
                { required, name, responsive, type, defaultValue, description },
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
                        <Text overflow="normal" bold size="sm" leading="tall">
                          <code>{name}</code>
                        </Text>
                      </Box>
                      {responsive && (
                        <Box>
                          <Text size="sm" leading="tall">
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
                      <Td overflow="normal" color="gray">
                        {description}
                      </Td>
                      <Td />
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
};
