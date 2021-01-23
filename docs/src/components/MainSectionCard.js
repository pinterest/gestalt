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
  defaultCode: string,
  description?: string,
  type?: 'do' | "don't" | 'info',
  shaded?: boolean,
  showCode?: boolean,
  cardSize?: 'sm' | 'md',
  title?: string,
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

const MainSectionCard = ({
  defaultCode,
  description,
  type = 'info',
  shaded = false,
  showCode = true,
  cardSize = 'md',
  title,
}: Props): Node => {
  const code = defaultCode.trim();
  const scope = { ...gestalt, DatePicker };
  const borderStyle =
    type !== 'info' ? `3px solid ${TYPE_TO_COLOR[type]}` : undefined;
  return (
    <Box
      width={CARD_SIZE_NAME_TO_PIXEL[cardSize]}
      marginTop={2}
      marginBottom={8}
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box>
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
        </Box>
        {showCode && cardSize !== 'sm' && (
          <ExampleCode code={code} name={title || ''} />
        )}
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
