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
  cardSize?: 'sm' | 'md' | 'lg',
  children?: Node,
  defaultCode?: string,
  description?: string,
  shaded?: boolean,
  showCode?: boolean,
  title?: string | Array<string>,
  type?: 'do' | "don't" | 'info',
|};

const CARD_SIZE_NAME_TO_PIXEL = {
  sm: 236,
  md: 362,
  lg: '100%',
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
  children,
  defaultCode,
  description,
  shaded = false,
  showCode = true,
  title,
  type = 'info',
}: Props): Node => {
  const code = defaultCode?.trim();
  const scope = { ...gestalt, DatePicker };
  const borderStyle =
    type !== 'info' ? `3px solid ${COLOR_TO_HEX[TYPE_TO_COLOR[type]]}` : undefined;
  const cardTitle = Array.isArray(title) ? title.join(', ') : title;
  return (
    <Box width={CARD_SIZE_NAME_TO_PIXEL[cardSize]} marginTop={2} marginBottom={8}>
      {children ? (
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
          {children}
        </Box>
      ) : (
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

          {showCode && code && cardSize !== 'sm' && (
            <ExampleCode code={code} name={cardTitle || ''} />
          )}

          <Box paddingX={2}>
            <Text color="watermelon">
              <LiveError />
            </Text>
          </Box>
        </LiveProvider>
      )}
      <Box
        marginTop={2}
        dangerouslySetInlineStyle={{
          __style: { borderTop: borderStyle },
        }}
      >
        {(title || type !== 'info') && (
          <Box paddingY={1}>
            <Text weight="bold" color={TYPE_TO_COLOR[type]}>
              {cardTitle || type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </Box>
        )}
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
