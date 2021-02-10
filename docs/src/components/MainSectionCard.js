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

type PreviewCardProps = {|
  children?: Node,
|};

const CARD_SIZE_NAME_TO_PIXEL = {
  sm: 236,
  md: 362,
  lg: '100%',
};

const TYPE_TO_COLOR = {
  do: 'pine',
  "don't": 'red',
  info: 'darkGray',
};

// Colors used here map to colors.css's .pine and .red styles
const COLOR_TO_HEX = {
  pine: '#0a6955',
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
  const shouldShowCode = showCode && cardSize !== 'sm' && type === 'info';

  const PreviewCard = ({ children: cardChildren }: PreviewCardProps): Node => {
    return (
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
        {cardChildren}
      </Box>
    );
  };

  const TitleAndDescription = (
    <Box
      marginTop={borderStyle ? 4 : 3}
      marginBottom={cardSize === 'lg' ? 4 : 0}
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
        <Box width="90%" marginTop={2} color="white">
          <Markdown text={description} />
        </Box>
      )}
    </Box>
  );

  return (
    <Box width={CARD_SIZE_NAME_TO_PIXEL[cardSize]} marginTop={4} marginBottom={4}>
      {cardSize === 'lg' && TitleAndDescription}

      {children && <PreviewCard>{children}</PreviewCard>}

      {code && (
        <LiveProvider code={code} scope={scope} theme={theme}>
          <PreviewCard>
            <LivePreview style={{ display: 'contents' }} />
          </PreviewCard>

          {shouldShowCode && <ExampleCode code={code} name={cardTitle || ''} />}

          <Box paddingX={2}>
            <Text color="watermelon">
              <LiveError />
            </Text>
          </Box>
        </LiveProvider>
      )}
      {cardSize !== 'lg' && TitleAndDescription}
    </Box>
  );
};

export default MainSectionCard;
