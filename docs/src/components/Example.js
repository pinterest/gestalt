// @flow
import React from 'react';
<<<<<<< Updated upstream
import Box from '../../../src/Box/Box';
import Container from '../../../src/Container/Container';
import Text from '../../../src/Text/Text';
=======
import {
  Box,
  Text,
  Link,
  Icon,
  Checkbox,
  Column,
  Mask,
  Heading,
} from 'gestalt';
>>>>>>> Stashed changes
import Checkerboard from './Checkerboard';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

type Props = {|
  defaultCode: string,
  scope: Object,
  stacked: boolean,
|};

<<<<<<< Updated upstream
export default ({ defaultCode, scope, stacked = false }: Props) => (
  <LiveProvider
    code={defaultCode.trim()}
    scope={{
      Box,
      Container,
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
        mdDirection={stacked ? 'column' : 'row'}
        alignItems="stretch"
        marginLeft={-2}
        marginRight={-2}
      >
        <Box column={12} mdColumn={stacked ? 12 : 6}>
          <Box paddingX={2}>
            <Box paddingY={2}>
              <Text size="sm" color="gray">
                Editor
=======
export default function Example({ defaultCode, scope }: Props) {
  return (
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
>>>>>>> Stashed changes
              </Text>
            </Box>
          </Box>
<<<<<<< Updated upstream
        </Box>

        <Box column={12} mdColumn={stacked ? 12 : 6}>
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
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      <Box padding={2}>
        <Text color="watermelon" leading="tall">
          <LiveError />
        </Text>
      </Box>
    </Box>
  </LiveProvider>
);
=======
    </LiveProvider>
  );
}
>>>>>>> Stashed changes
