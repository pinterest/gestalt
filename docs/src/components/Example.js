// @flow strict
import React, { type Node } from 'react';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import Card from './Card.js';
import theme from './atomDark.js';
import ExampleCode from './ExampleCode.js';

type Props = {|
  defaultCode: string,
  description?: string,
  id?: string,
  name: string,
  direction?: 'row' | 'column',
  showHeading?: boolean,
  headingSize?: 'sm' | 'md',
|};

const { Box, Column, Text } = gestalt;

const Example = ({
  defaultCode,
  description,
  id,
  name,
  direction = 'column',
  headingSize,
  showHeading,
}: Props): Node => {
  const code = defaultCode.trim();
  const scope = { ...gestalt, DatePicker };

  return (
    <Card
      name={name}
      description={description}
      id={id}
      stacked={direction === 'column'}
      showHeading={showHeading}
      headingSize={headingSize}
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box
          display="flex"
          direction={direction}
          marginLeft={-2}
          marginRight={-2}
        >
          <Column span={direction === 'column' ? 12 : 6}>
            <Box
              paddingX={2}
              display="flex"
              direction="column"
              alignItems="stretch"
              height="100%"
            >
              <Box paddingY={2}>
                <Text size="md" color="gray">
                  Preview
                </Text>
              </Box>

              <Box flex="grow" position="relative">
                <Box
                  position="absolute"
                  left
                  width={4}
                  color="lightGray"
                  height="100%"
                />
                <Box position="relative" padding={4}>
                  <LivePreview />
                </Box>
              </Box>
            </Box>
          </Column>
          <Column span={direction === 'column' ? 12 : 6}>
            <ExampleCode code={code} name={name} />
          </Column>
        </Box>

        <Box padding={2}>
          <Text color="watermelon">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Card>
  );
};

export default Example;
