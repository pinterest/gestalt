import { ReactNode, useCallback } from 'react';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Box, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import {
  TOKEN_COLOR_BACKGROUND_DEFAULT,
  TOKEN_COLOR_BACKGROUND_ERROR_BASE,
  TOKEN_COLOR_BACKGROUND_SUCCESS_BASE,
} from 'gestalt-design-tokens';
import theme from './atomDark';
import OpenSandboxButton from './buttons/OpenSandboxButton';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import ExampleCode from './ExampleCode';
import handleCodeSandbox from './handleCodeSandbox';
import Markdown from './Markdown';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

type Props = {
  cardSize?: 'xs' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
  defaultCode?: string;
  description?: string;
  hideCodePreview?: boolean;
  sandpackExample?: ReactNode;
  shadeColor?: 'tertiary' | 'darkWash' | 'lightWash' | 'default';
  shaded?: boolean;
  showCode?: boolean;
  title?: string | ReadonlyArray<string>;
  type?: 'do' | "don't" | 'info';
  marginBottom?: 'default' | 'none';
};

type PreviewCardProps = {
  children?: ReactNode;
};

const CARD_SIZE_NAME_TO_PIXEL = {
  xs: 90,
  sm: 236,
  md: 362,
  lg: '100%',
} as const;

const TYPE_TO_COLOR_TOKEN = {
  do: TOKEN_COLOR_BACKGROUND_SUCCESS_BASE,
  "don't": TOKEN_COLOR_BACKGROUND_ERROR_BASE,
  info: TOKEN_COLOR_BACKGROUND_DEFAULT,
} as const;

const TYPE_TO_COLOR_TEXT = {
  do: 'success',
  "don't": 'error',
  info: 'default',
} as const;

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
}: Props) {
  const code = defaultCode?.trim();
  const scope = { ...gestalt, ...gestaltChart, ...gestaltDatepicker } as const;

  const borderStyle = type !== 'info' ? `3px solid ${TYPE_TO_COLOR_TOKEN[type]}` : undefined;

  const cardTitle = Array.isArray(title) ? title.join(', ') : title;
  // Only show code if it's a md or lg card and it's not a Do/Don't
  const shouldShowCode = showCode && cardSize !== 'sm' && type === 'info';
  const showTitleAndDescriptionAboveExample = title && type === 'info';

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
      dangerouslySetInlineStyle={{
        __style: { borderTop: borderStyle },
      }}
      marginBottom={cardSize === 'lg' ? 4 : 0}
      marginTop={borderStyle ? 4 : 3}
    >
      {(title || type !== 'info') && (
        <Box display="flex" justifyContent="between" paddingY={1}>
          <Text color={TYPE_TO_COLOR_TEXT[type]} weight="bold">
            {cardTitle || capitalizeFirstLetter(type)}
          </Text>
          {type === 'do' && code && (
            <OpenSandboxButton
              onClick={() => {
                // @ts-expect-error - TS2322 - Type 'string | readonly string[]' is not assignable to type 'string'.
                handleCodeSandbox({ code, title: cardTitle || '' });
              }}
            />
          )}
        </Box>
      )}
      {description && (
        <Box color="default" marginTop={2} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
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
    // @ts-expect-error - TS2322 - Type 'number' is not assignable to type '"auto" | SignedUpTo12 | undefined'.
    <Box marginBottom={marginBotton} minWidth={CARD_SIZE_NAME_TO_PIXEL[cardSize]}>
      {showTitleAndDescriptionAboveExample && (title || description) && TitleAndDescription}

      {Boolean(children) && <PreviewCard>{children}</PreviewCard>}

      {code && (
        // @ts-expect-error - TS2322 - Type '{ readonly plain: { readonly backgroundColor: "#2a2734"; readonly color: "#88BBBF"; readonly lineHeight: 1.4; readonly fontSize: 16; readonly fontFamily: "PragmataPro, \"Roboto Mono\", Monaco, Consolas, \"Courier New\", \"Courier, monospace !important"; }; readonly styles: readonly [...]; }' is not assignable to type 'PrismTheme'.
        <LiveProvider code={code} scope={scope} theme={theme}>
          <PreviewCard>
            <LivePreview style={{ display: 'contents' }} />
          </PreviewCard>
          {/* If it uses an iframe, show the original code (below), instead of the iframe code */}
          {shouldShowCode && (
            // @ts-expect-error - TS2322 - Type 'string | readonly string[]' is not assignable to type 'string'.
            <ExampleCode code={code} hideCodePreview={hideCodePreview} name={cardTitle || ''} />
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
