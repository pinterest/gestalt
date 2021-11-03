// @flow strict
import { Box, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';
import type { Node } from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import ExampleCode from './ExampleCode.js';
import theme from './atomDark.js';
import Markdown from './Markdown.js';
import { capitalizeFirstLetter } from './utils.js';

type Props = {|
  cardSize?: 'sm' | 'md' | 'lg',
  children?: Node,
  defaultCode?: string,
  description?: string,
  iframeContent?: string,
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
  iframeContent,
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
  // Only show code if it's a md or lg card and it's not a Do/Don't
  const shouldShowCode = showCode && cardSize !== 'sm' && type === 'info';
  const showTitleAndDescriptionAboveExample = cardSize === 'lg' && type === 'info';

  const PreviewCard = ({ children: cardChildren }: PreviewCardProps): Node => (
      <Box
        alignItems="center"
        borderStyle="sm"
        color={shaded ? 'lightGray' : 'white'}
        display="flex"
        height={CARD_SIZE_NAME_TO_PIXEL[cardSize]}
        justifyContent="center"
        padding={8}
        position="relative"
        rounding={2}
      >
        {cardChildren}
      </Box>
    );

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
            {cardTitle || capitalizeFirstLetter(type)}
          </Text>
        </Box>
      )}
      {description && (
        <Box maxWidth={572} marginTop={2} color="white">
          <Markdown text={description} />
        </Box>
      )}
    </Box>
  );

  return (
    <Box minWidth={CARD_SIZE_NAME_TO_PIXEL[cardSize]} marginBottom={12}>
      {showTitleAndDescriptionAboveExample && (title || description) && TitleAndDescription}

      {Boolean(children) && <PreviewCard>{children}</PreviewCard>}

      {code && (
        <LiveProvider code={iframeContent || code} scope={scope} theme={theme}>
          <PreviewCard>
            <LivePreview style={{ display: 'contents' }} />
          </PreviewCard>
          {/* If it uses an iframe, show the original code (below), instead of the iframe code */}
          {shouldShowCode && !iframeContent && <ExampleCode code={code} name={cardTitle || ''} />}

          <Box paddingX={2}>
            <Text color="watermelon">
              <LiveError />
            </Text>
          </Box>
        </LiveProvider>
      )}
      {iframeContent && code && (
        <LiveProvider code={code} scope={scope} theme={theme}>
          {shouldShowCode && <ExampleCode readOnly code={code} name={cardTitle || ''} />}
        </LiveProvider>
      )}
      {!showTitleAndDescriptionAboveExample && TitleAndDescription}
    </Box>
  );
};

export default MainSectionCard;
