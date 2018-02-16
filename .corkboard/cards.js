import React, { isValidElement } from 'react';
import { registerCard, ns as registerNamespace } from 'corkboard';
import Box from '../src/Box/Box';
import Link from '../src/Link/Link';
import Text from '../src/Text/Text';
import Icon from '../src/Icon/Icon';
import Checkbox from '../src/Checkbox/Checkbox';
import Column from '../src/Column/Column';
import Mask from '../src/Mask/Mask';
import Heading from '../src/Heading/Heading';
import StateRecorder from './StateRecorder';
import cs from 'classnames';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import '!style!css!./AtomDark.css';

import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';

function Markdown({ text }) {
  const renderer = new Renderer();

  renderer.code = (code, language) => {
    const highlight = highlightjs.highlight(language, code).value;
    return `<pre><code class="hljs ${language}">${highlight}</code></pre>`;
  };

  const html = marked(text, { renderer });

  return (
    <Text leading="tall">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Text>
  );
}

const sourceUrl = name => {
  name = name.replace(/\s+/g, '');
  return `https://github.com/pinterest/gestalt/blob/master/src/${name}/${name}.js`;
};

export function ns(name, text = '') {
  const url = sourceUrl(name);
  registerNamespace(name);
  registerCard(
    <Box display="flex" direction="row">
      <Column span={6}>
        <Box
          display="flex"
          direction="row"
          alignItems="center"
          marginBottom={4}
        >
          <Box>
            <Heading size="md">{name}</Heading>

            <Text size="sm">
              <Link href={url} target="blank" color="gray">
                View source on GitHub
              </Link>
            </Text>
          </Box>
        </Box>
      </Column>
      <Column span={6}>
        <Markdown text={text} />
      </Column>
    </Box>
  );
}

// Source: https://github.com/Thinkmill/react-markings/blob/master/index.js
// which originally got it from https://github.com/sindresorhus/strip-indent
function stripIndent(str) {
  var match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }

  var indent = Math.min.apply(
    Math,
    match.map(function(x) {
      return x.length;
    })
  );

  if (indent === 0) {
    return str;
  }

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  return str.replace(re, '');
}

export function md(str) {
  return (
    <Box maxWidth={800}>
      <Markdown
        text={stripIndent(typeof str === 'string' ? str : str.join('\n'))}
      />
    </Box>
  );
}

export function parseArgs(args) {
  let name;
  let parts = [];
  let options = Card.defaultProps.options;
  let i = 0;

  if (typeof args[0] === 'string') {
    [name] = args;
    i += 1;
  }

  while (
    i < args.length &&
    (isValidElement(args[i]) || typeof args[i] !== 'object')
  ) {
    parts = [...parts, args[i]];
    i += 1;
  }

  if (i < args.length) {
    options = {
      ...options,
      ...args[i],
    };
    i += 1;
  }

  return {
    name,
    parts,
    options,
  };
}

export default function Card(props) {
  const {
    name,
    parts,
    options: { heading, history, initialState, inspectData, stacked },
  } = props;

  const partsOrStateRecorders = parts.map(part => {
    if (typeof part === 'function') {
      return (
        <StateRecorder
          fn={part}
          historyLimit={100}
          initialState={initialState}
          showHistory={history}
          showState={inspectData}
        />
      );
    }
    return part;
  });

  return (
    <Box>
      {heading && (
        <Box marginTop={4}>
          <Heading size="xs">{name}</Heading>
        </Box>
      )}
      <Box
        marginLeft={-2}
        marginRight={-2}
        display="flex"
        direction={stacked ? 'column' : 'row'}
      >
        {partsOrStateRecorders.map((node, i) => (
          <Box paddingX={2} column={12} key={i}>
            {node}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

Card.defaultProps = {
  options: {
    heading: true,
    history: false,
    initialState: {},
    inspectData: false,
    stacked: false,
  },
};

export const card = (...args) => {
  registerCard(<Card {...parseArgs(args)} />);
};

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
      <Text overflow="normal" __dangerouslyIncreaseLineHeight {...props}>
        {children}
      </Text>
    </Box>
  </td>
);

const upcase = ([first, ...rest]) => [first.toUpperCase(), ...rest].join('');
const sortBy = (list, fn) => list.sort((a, b) => fn(a).localeCompare(fn(b)));

export const PropTable = ({ props, Component }) => {
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
                        <Text
                          overflow="normal"
                          bold
                          __dangerouslyIncreaseLineHeight
                        >
                          <code>{name}</code>
                        </Text>
                      </Box>
                      {responsive && (
                        <Box>
                          <Text size="sm" __dangerouslyIncreaseLineHeight>
                            <code>
                              sm{upcase(name)}, md{upcase(name)}, lg{upcase(name)}
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
};

export const Checkerboard = ({ size = 8 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="100%"
    height="100%"
    style={{ display: 'flex' }}
    preserveAspectRatio="none"
  >
    <pattern
      id="pattern"
      x={0}
      y={0}
      width={size * 2}
      height={size * 2}
      patternUnits="userSpaceOnUse"
    >
      <rect fill="rgba(0, 0, 0, 0.06)" x={0} width={size} height={size} y={0} />
      <rect
        fill="rgba(0, 0, 0, 0.06)"
        x={size}
        width={size}
        height={size}
        y={size}
      />
    </pattern>
    <rect fill="url(#pattern)" x={0} y={0} width="100%" height="100%" />
  </svg>
);

export const Example = ({ defaultCode, scope }) => (
  <LiveProvider
    code={defaultCode.trim()}
    scope={{
      Box,
      Link,
      Text,
      Icon,
      Checkbox,
      Column,
      Mask,
      Heading,
      ...scope,
    }}
  >
    <Box>
      <Box
        display="flex"
        direction="column"
        mdDirection="row"
        alignItems="stretch"
        marginLeft={-2}
        marginRight={-2}
      >
        <Box xs={{ column: 12 }} md={{ column: 6 }}>
          <Box paddingX={2}>
            <Box paddingY={2}>
              <Text size="sm" color="gray">
                Editor
              </Text>
            </Box>
            <Text>
              <LiveEditor />
            </Text>
          </Box>
        </Box>

        <Box xs={{ column: 12 }} md={{ column: 6 }}>
          <Box
            paddingX={2}
            display="flex"
            direction="column"
            alignItems="stretch"
            height="100%"
          >
            <Box paddingY={2}>
              <Text size="sm" color="gray">
                Preview
              </Text>
            </Box>

            <Box flex="grow" position="relative">
              <Box position="absolute" top bottom left right>
                <Checkerboard />
              </Box>
              <Box position="relative" padding={4}>
                <LivePreview />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={2}>
        <Text color="watermelon" __dangerouslyIncreaseLineHeight>
          <LiveError />
        </Text>
      </Box>
    </Box>
  </LiveProvider>
);

const flatMap = (arr, fn) => arr.map(fn).reduce((a, b) => a.concat(b));
const combinations = variationsByField => {
  const fieldNames = Object.keys(variationsByField);

  if (!fieldNames.length) return [{}];

  const _combinations = ([fieldName, ...restFieldNames], acc) => {
    const variationsForField = variationsByField[fieldName];

    if (!Array.isArray(variationsForField) || !variationsForField.length) {
      throw new Error(
        `Please provide a non-empty array of possible values for prop ${fieldName}`
      );
    }

    const vs = variationsForField.map(fieldValue => ({
      ...acc,
      [fieldName]: fieldValue,
    }));

    if (!restFieldNames.length) {
      return vs;
    }
    return flatMap(vs, newAcc => _combinations(restFieldNames, newAcc));
  };

  return _combinations(fieldNames, {});
};

const toReactAttribute = (key, value) => {
  switch (typeof value) {
    case 'boolean':
      return value && key;
    case 'string':
      return `${key}=${JSON.stringify(value)}`;
    default:
      return `${key}={${JSON.stringify(value)}}`;
  }
};

export const Combination = ({ children, ...props }) => (
  <Box display="flex" wrap>
    {combinations(props).map((combination, i) => (
      <Box
        column={4}
        mdColumn={3}
        lgColumn={2}
        key={i}
        padding={4}
        display="flex"
        direction="column"
        alignItems="center"
      >
        <Box marginBottom={2}>
          {Object.keys(combination).map(key => (
            <Text align="center" size="sm" key={`${i}-${key}`}>
              {toReactAttribute(key, combination[key])}
            </Text>
          ))}
        </Box>
        <Box position="relative" padding={4}>
          <Box position="absolute" top left bottom right>
            <Checkerboard />
          </Box>
          <Box position="relative">{children(combination, i)}</Box>
        </Box>
      </Box>
    ))}
  </Box>
);
