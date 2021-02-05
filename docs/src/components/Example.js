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
  showHeading?: boolean,
  showCode?: boolean,
  headingSize?: 'sm' | 'md',
|};

const { Box, Text } = gestalt;

const Example = ({
  defaultCode,
  description,
  id,
  name,
  headingSize,
  showHeading,
  showCode = true,
}: Props): Node => {
  const code = defaultCode.trim();
  const scope = { ...gestalt, DatePicker };

  return (
    <Card
      name={name}
      description={description}
      id={id}
      stacked
      showHeading={showHeading}
      headingSize={headingSize}
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box display="flex" direction="column" marginStart={-2} marginEnd={-2}>
          <Box padding={2} height="100%">
            <Box position="relative" padding={4} borderStyle="sm" rounding={2}>
              <LivePreview />
            </Box>
          </Box>

          {showCode && (
            <Box paddingX={2}>
              <ExampleCode code={code} name={name} />
            </Box>
          )}
        </Box>

        <Box paddingX={2}>
          <Text color="watermelon">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Card>
  );
};

export default Example;
