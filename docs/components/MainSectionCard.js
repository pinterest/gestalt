// @flow strict
import { type Node, useCallback } from 'react';
import { Box, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import ExampleCode from './ExampleCode.js';
import theme from './atomDark.js';
import Markdown from './Markdown.js';
import { capitalizeFirstLetter } from './utils.js';
import OpenSandboxButton from './buttons/OpenSandboxButton.js';
import handleCodeSandbox from './handleCodeSandbox.js';

type Props = {|
  cardSize?: 'sm' | 'md' | 'lg',
  children?: Node,
  defaultCode?: string,
  description?: string,
  hideCodePreview?: boolean,
  iframeContent?: string,
  shadeColor?: 'tertiary' | 'darkWash' | 'lightWash' | 'default',
  shaded?: boolean,
  showCode?: boolean,
  title?: string | Array<string>,
  type?: 'do' | "don't" | 'info',
  removeMarginBottom?: boolean,
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
  do: 'success',
  "don't": 'error',
  info: 'default',
};

function MainSectionCard({
  cardSize = 'md',
  children,
  defaultCode,
  description,
  iframeContent,
  hideCodePreview = false,
  shaded = false,
  shadeColor,
  showCode = true,
  title,
  removeMarginBottom = false,
  type = 'info',
}: Props): Node {
  const code = defaultCode?.trim();
  const scope = { ...gestalt, DatePicker };
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
        borderStyle="sm"
        color={cardShadeColor}
        display="flex"
        height={CARD_SIZE_NAME_TO_PIXEL[cardSize]}
        justifyContent="center"
        padding={8}
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
        <Box maxWidth={572} marginTop={2} color="default">
          <Markdown text={description} />
        </Box>
      )}
    </Box>
  );

  return (
    <Box minWidth={CARD_SIZE_NAME_TO_PIXEL[cardSize]} marginBottom={removeMarginBottom ? 0 : 12}>
      {showTitleAndDescriptionAboveExample && (title || description) && TitleAndDescription}

      {Boolean(children) && <PreviewCard>{children}</PreviewCard>}

      {code && (
        <LiveProvider code={iframeContent || code} scope={scope} theme={theme}>
          <PreviewCard>
            <LivePreview style={{ display: 'contents' }} />
          </PreviewCard>
          {/* If it uses an iframe, show the original code (below), instead of the iframe code */}
          {shouldShowCode && !iframeContent && (
            <ExampleCode hideCodePreview={hideCodePreview} code={code} name={cardTitle || ''} />
          )}

          <Box paddingX={2}>
            <Text color="error">
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
}

export default MainSectionCard;
