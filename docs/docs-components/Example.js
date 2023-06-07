// @flow strict
import { type Node } from 'react';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import theme from './atomDark.js';
import Card from './Card.js';
import ExampleCode from './ExampleCode.js';

type Props = {|
  defaultCode: string,
  description?: string,
  id?: string,
  name: string,
  showHeading?: boolean,
  showCode?: boolean,
  skipContrastCheck?: boolean,
  headingSize?: 'sm' | 'md',
|};

const { Box, Text } = gestalt;

function Example({
  defaultCode,
  description,
  id,
  name,
  headingSize,
  showHeading,
  showCode = true,
  skipContrastCheck = false,
}: Props): Node {
  const code = defaultCode.trim();
  const scope = { ...gestalt, ...gestaltDatepicker };

  return (
    <Card
      name={name}
      description={description}
      id={id}
      stacked
      showHeading={showHeading}
      headingSize={headingSize === 'md' ? '500' : '400'}
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box display="flex" direction="column" marginStart={-2} marginEnd={-2} marginBottom={6}>
          <Box padding={2} height="100%" width="100%">
            <Box position="relative" padding={4} borderStyle="sm" rounding={2} color="default">
              <LivePreview className={skipContrastCheck ? 'skip-accessibility-check' : undefined} />
            </Box>
          </Box>

          {showCode && (
            <Box paddingX={2}>
              <ExampleCode code={code} name={name} />
            </Box>
          )}
        </Box>

        <Box paddingX={2}>
          <Text color="error">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Card>
  );
}

export default Example;
