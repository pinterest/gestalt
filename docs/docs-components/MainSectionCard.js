// @flow strict
import { type Node, useCallback } from 'react';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Box, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import theme from './atomDark.js';
import OpenSandboxButton from './buttons/OpenSandboxButton.js';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts.js';
import ExampleCode from './ExampleCode.js';
import handleCodeSandbox from './handleCodeSandbox.js';
import Markdown from './Markdown.js';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js';

type Props = {|
  cardSize?: 'xs' | 'sm' | 'md' | 'lg',
  children?: Node,
  defaultCode?: string,
  description?: string,
  hideCodePreview?: boolean,
  sandpackExample?: Node,
  shadeColor?: 'tertiary' | 'darkWash' | 'lightWash' | 'default',
  shaded?: boolean,
  showCode?: boolean,
  title?: string | $ReadOnlyArray<string>,
  type?: 'do' | "don't" | 'info',
  marginBottom?: 'default' | 'none',
|};

type PreviewCardProps = {|
  children?: Node,
|};

const CARD_SIZE_NAME_TO_PIXEL = {
  xs: 90,
  sm: 236,
  md: 362,
  lg: '100%',
};

const TYPE_TO_COLOR = {
  do: 'success',
  "don't": 'error',
  info: 'default',
};

function MainSectionCard({
  cardSize = 'md',
  children,
  defaultCode,
  description,
  hideCodePreview = false,
  sandpackExample,
  shaded = false,
  shadeColor,
  showCode = true,
  title,
  marginBottom = 'default',
  type = 'info',
}: Props): Node {
  const code = defaultCode?.trim();
  const scope = { ...gestalt, ...gestaltChart, ...gestaltDatepicker };
  const borderStyle =
    type !== 'info' ? `3px solid var(--color-background-${TYPE_TO_COLOR[type]}-base)` : undefined;
  const cardTitle = Array.isArray(title) ? title.join(', ') : title;
  // Only show code if it's a md or lg card and it's not a Do/Don't
  const shouldShowCode = showCode && cardSize !== 'sm' && type === 'info';
  const showTitleAndDescriptionAboveExample = cardSize === 'lg' && type === 'info';

  const cardShadeColor = shaded && !shadeColor ? 'secondary' : shadeColor;

  const PreviewCard = useCallback(
    ({ children: cardChildren }: PreviewCardProps) => (
      <Box
        alignItems="center"
        borderStyle={cardSize === 'xs' ? 'none' : 'sm'}
        color={cardShadeColor}
        display="flex"
        height={cardSize === 'xs' ? 80 : CARD_SIZE_NAME_TO_PIXEL[cardSize]}
        justifyContent="center"
        padding={cardSize === 'xs' ? 1 : 8}
        position="relative"
        rounding={2}
      >
        {cardChildren}
      </Box>
    ),
    [cardSize, cardShadeColor],
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
        <Box paddingY={1} display="flex" justifyContent="between">
          <Text weight="bold" color={TYPE_TO_COLOR[type]}>
            {cardTitle || capitalizeFirstLetter(type)}
          </Text>
          {type === 'do' && code && (
            <OpenSandboxButton
              onClick={() => {
                handleCodeSandbox({ code, title: cardTitle || '' });
              }}
            />
          )}
        </Box>
      )}
      {description && (
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={2} color="default">
          <Markdown text={description} />
        </Box>
      )}
    </Box>
  );

  let marginBotton = 12;
  if (marginBottom === 'none') {
    marginBotton = 0;
  }

  if (cardSize === 'xs') {
    marginBotton = 4;
  }

  return (
    <Box minWidth={CARD_SIZE_NAME_TO_PIXEL[cardSize]} marginBottom={marginBotton}>
      {showTitleAndDescriptionAboveExample && (title || description) && TitleAndDescription}

      {Boolean(children) && <PreviewCard>{children}</PreviewCard>}

      {code && (
        <LiveProvider code={code} scope={scope} theme={theme}>
          <PreviewCard>
            <LivePreview style={{ display: 'contents' }} />
          </PreviewCard>
          {/* If it uses an iframe, show the original code (below), instead of the iframe code */}
          {shouldShowCode && (
            <ExampleCode hideCodePreview={hideCodePreview} code={code} name={cardTitle || ''} />
          )}

          <Box paddingX={2}>
            <Text color="error">
              <LiveError />
            </Text>
          </Box>
        </LiveProvider>
      )}

      {sandpackExample}

      {!showTitleAndDescriptionAboveExample && TitleAndDescription}
    </Box>
  );
}

export default MainSectionCard;
