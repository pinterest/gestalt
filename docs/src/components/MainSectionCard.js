// @flow strict
import { Box, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';

import React, { type Node } from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import theme from './atomDark.js';

type Props = {|
  defaultCode: string,
  description: string,
  type?: 'do' | "don't" | 'info',
  shaded?: boolean,
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
      marginTop={4}
      marginBottom={2}
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box padding={0}>
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
        <Box padding={2}>
          <Text color="watermelon">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
      <Box
        dangerouslySetInlineStyle={{
          __style: { borderTop: borderStyle },
        }}
      >
        <Box paddingY={1}>
          <Text weight="bold" color={TYPE_TO_COLOR[type]}>
            {title || type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </Box>
        <Box width="90%">
          <Text>{description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MainSectionCard;
