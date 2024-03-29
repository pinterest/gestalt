// @flow strict
import { type Node as ReactNode } from 'react';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import theme from './atomDark';
import Card from './Card';
import ExampleCode from './ExampleCode';

type Props = {
  defaultCode: string,
  description?: string,
  id?: string,
  name: string,
  showHeading?: boolean,
  showCode?: boolean,
  headingSize?: 'sm' | 'md',
};

const { Box, Text } = gestalt;

function Example({
  defaultCode,
  description,
  id,
  name,
  headingSize,
  showHeading,
  showCode = true,
}: Props): ReactNode {
  const code = defaultCode.trim();
  const scope = { ...gestalt, ...gestaltChart, ...gestaltDatepicker };

  return (
    <Card
      description={description}
      headingSize={headingSize === 'md' ? '500' : '400'}
      id={id}
      name={name}
      showHeading={showHeading}
      stacked
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box direction="column" display="flex" marginBottom={6} marginEnd={-2} marginStart={-2}>
          <Box height="100%" padding={2} width="100%">
            <Box borderStyle="sm" color="default" padding={4} position="relative" rounding={2}>
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
          <Text color="error">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Card>
  );
}

export default Example;
