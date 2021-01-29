// @flow strict
import { Box, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';
import React, { type Node } from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import ExampleCode from './ExampleCode.js';
import theme from './atomDark.js';
import Markdown from './Markdown.js';

type Props = {|
  cardSize?: 'sm' | 'md',
  defaultCode: string,
  description?: string,
  shaded?: boolean,
  showCode?: boolean,
  title?: string,
  type?: 'do' | "don't" | 'info',
|};

const CARD_SIZE_NAME_TO_PIXEL = {
  sm: 236,
  md: 362,
};

const TYPE_TO_COLOR = {
  do: 'green',
  "don't": 'red',
  info: 'darkGray',
};

// Colors used here map to colors.css's .red and .green styles
const COLOR_TO_HEX = {
  green: '#0fa573',
  red: '#e60023',
};

const MainSectionCard = ({
  cardSize = 'md',
  defaultCode,
  description,
  shaded = false,
  showCode = true,
  title,
  type = 'info',
}: Props): Node => {
  const code = defaultCode.trim();
  const scope = { ...gestalt, DatePicker };
  const borderStyle =
    type !== 'info' ? `3px solid ${COLOR_TO_HEX[TYPE_TO_COLOR[type]]}` : undefined;
  return (
    <Box width={CARD_SIZE_NAME_TO_PIXEL[cardSize]} marginTop={2} marginBottom={8}>
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box
          alignItems="center"
          borderStyle="sm"
          color={shaded ? 'lightGray' : 'white'}
          display="flex"
          height={CARD_SIZE_NAME_TO_PIXEL[cardSize]}
          justifyContent="center"
          padding={4}
          position="relative"
          rounding={2}
        >
          <LivePreview />
        </Box>

        {showCode && cardSize !== 'sm' && <ExampleCode code={code} name={title || ''} />}

        <Box paddingX={2}>
          <Text color="watermelon">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
      <Box
        marginTop={2}
        dangerouslySetInlineStyle={{
          __style: { borderTop: borderStyle },
        }}
      >
        <Box paddingY={1}>
          <Text weight="bold" color={TYPE_TO_COLOR[type]}>
            {title || type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </Box>
        {description && (
          <Box width="90%" marginTop={-3}>
            <Markdown text={description} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainSectionCard;
