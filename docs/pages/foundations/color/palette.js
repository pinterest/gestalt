// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import {
  TOKEN_COLOR_BLACK_COSMICORE_900,
  TOKEN_COLOR_BLUE_SKYCICLE_50,
  TOKEN_COLOR_BLUE_SKYCICLE_300,
  TOKEN_COLOR_BLUE_SKYCICLE_450,
  TOKEN_COLOR_GRAY_ROBOFLOW_50,
  TOKEN_COLOR_GRAY_ROBOFLOW_200,
  TOKEN_COLOR_GRAY_ROBOFLOW_300,
  TOKEN_COLOR_GREEN_MATCHACADO_450,
  TOKEN_COLOR_ORANGE_FIRETINI_450,
  TOKEN_COLOR_PINK_FLAMINGLOW_450,
  TOKEN_COLOR_PURPLE_MYSTICOOL_450,
  TOKEN_COLOR_RED_PUSHPIN_450,
  TOKEN_COLOR_TEAL_SPABATTICAL_450,
  TOKEN_COLOR_WHITE_MOCHIMALIST_0,
  TOKEN_COLOR_YELLOW_CARAMELLOW_450,
} from 'gestalt-design-tokens';
import ColorPalette from '../../../docs-components/ColorPalette';
import ColorTile from '../../../docs-components/ColorTile';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

const colors = [
  {
    name: 'Pushpin',
    id: 'red',
    token: TOKEN_COLOR_RED_PUSHPIN_450,
    textColor: 'light',
  },
  {
    name: 'Flaminglow',
    id: 'pink',
    token: TOKEN_COLOR_PINK_FLAMINGLOW_450,
    textColor: 'dark',
  },
  {
    name: 'Skycicle',
    id: 'blue',
    token: { TOKEN_COLOR_BLUE_SKYCICLE_450 },
    textColor: 'dark',
  },
  {
    name: 'Spabattical',
    id: 'teal',
    token: { TOKEN_COLOR_TEAL_SPABATTICAL_450 },
    textColor: 'dark',
  },
  {
    name: 'Matchacado',
    id: 'green',
    token: { TOKEN_COLOR_GREEN_MATCHACADO_450 },
    textColor: 'dark',
  },
  {
    name: 'Mysticool',
    id: 'purple',
    token: { TOKEN_COLOR_PURPLE_MYSTICOOL_450 },
    textColor: 'light',
  },
  {
    name: 'Firetini',
    id: 'orange',
    token: { TOKEN_COLOR_ORANGE_FIRETINI_450 },
    textColor: 'dark',
  },
  {
    name: 'Caramellow',
    id: 'yellow',
    token: { TOKEN_COLOR_YELLOW_CARAMELLOW_450 },
    textColor: 'dark',
  },
];

const neutrals = [
  { name: 'Mochimalist', id: 'white', textColor: 'dark' },
  { name: 'Roboflow', id: 'gray', textColor: 'dark' },
  { name: 'Cosmicore', id: 'black', textColor: 'light' },
];

const transparent = [{ name: '', id: 'transparent', textColor: 'dark' }];

type ColorCardProps = {
  children: ReactNode,
  colorScheme: 'light' | 'dark',
};
function ColorSchemeCard({ children, colorScheme }: ColorCardProps): ReactNode {
  return (
    <Flex
      gap={{
        row: 4,
        column: 0,
      }}
    >
      <ColorSchemeProvider key={colorScheme} colorScheme={colorScheme} id={colorScheme}>
        <Box color="default" padding={4}>
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 4,
            }}
          >
            <Text color="default" size="400" weight="bold">
              {colorScheme === 'light' ? 'Light mode' : 'Dark mode'}
            </Text>
            {children}
          </Flex>
        </Box>
      </ColorSchemeProvider>
    </Flex>
  );
}

export default function ColorPage(): ReactNode {
  return (
    <Page title="Color palette">
      <PageHeader
        description={`
        Our color palettes are shared between Brand and Gestalt, and represent our full range of options. The colors are divided into baseline, extended, and reserved colors.

        For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/).
        `}
        name="Color palette"
        type="guidelines"
      />
      <MainSection
        description={`
        Our baseline palette helps to create consistency across products.
        The baseline palette is comprised of our hero and neutrals colors, allowing the Pinterest content to shine, while ensuring enough color contrast. In addition, the colors used serve specific purposes in order to provide a better user experience. Check out [Color Usage](/foundations/color/usage) for more details about their intended usage.
        `}
        name="Baseline colors"
      >
        <Flex
          gap={{
            row: 4,
            column: 0,
          }}
          wrap
        >
          <ColorSchemeCard colorScheme="light">
            <ColorTile description="Pushpin 450" number={450} token={TOKEN_COLOR_RED_PUSHPIN_450} />
            <ColorTile
              description="Cosmicore 900"
              number={900}
              token={TOKEN_COLOR_BLACK_COSMICORE_900}
            />
            <ColorTile
              description="Skycicle 500"
              number={500}
              token={TOKEN_COLOR_BLUE_SKYCICLE_50}
            />
            <ColorTile
              description="Roboflow 500"
              number={500}
              token={TOKEN_COLOR_GRAY_ROBOFLOW_50}
            />
            <ColorTile
              description="Roboflow 200"
              number={200}
              token={TOKEN_COLOR_GRAY_ROBOFLOW_200}
            />
            <ColorTile
              description="Mochimalist 0"
              number={0}
              token={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
            />
          </ColorSchemeCard>
          <ColorSchemeCard colorScheme="dark">
            <ColorTile description="Pushpin 450" number={450} token={TOKEN_COLOR_RED_PUSHPIN_450} />
            <ColorTile
              description="Mochimalist 0"
              number={0}
              token={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
            />
            <ColorTile
              description="Skycicle 300"
              number={300}
              token={TOKEN_COLOR_BLUE_SKYCICLE_300}
            />
            <ColorTile
              description="Roboflow 300"
              number={300}
              token={TOKEN_COLOR_GRAY_ROBOFLOW_300}
            />
            <ColorTile
              description="Roboflow 500"
              number={500}
              token={TOKEN_COLOR_GRAY_ROBOFLOW_50}
            />
            <ColorTile
              description="Cosmicore 900"
              number={900}
              token={TOKEN_COLOR_BLACK_COSMICORE_900}
            />
          </ColorSchemeCard>
        </Flex>
      </MainSection>
      <MainSection
        description="The 450 colors are primarily reserved for Brand usage as they are among the least accessible colors. This set works best within larger brand moments, and is not commonly used for functional color pairings. While Pushpin 450 is our hero, primary product color, please only use other 450 colors when absolutely necessary while maintaining accessibility."
        name="Reserved colors"
      >
        <Flex direction="column">
          {colors.map(({ id, name, textColor }) => (
            <ColorTile
              key={name}
              description={`${name} 450`}
              textColor={textColor}
              token={`var(--color-${id}-${name.toLowerCase()}-450)`}
            />
          ))}
        </Flex>
      </MainSection>

      <MainSection
        description={`
        The extended color palette displays all the available shades and tints of each color in the palette. The colors are named and numbered for easy reference. The usage of these colors varies depending on the product needs, but they come in handy for illustrations, communicating status, and brand moments.

        We aim to meet [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/), and in order to ensure accessible contrast for color pairings, we require our \`darkGray\` [Text](/web/text) color to be used for any colors 400 and below. For 500 and above, we recommend using \`white\`.
        `}
        name="Extended palette"
      >
        <MainSection.Subsection description="Pinterest name (common name)" title="Colors">
          <Flex
            gap={{
              row: 12,
              column: 0,
            }}
            wrap
          >
            {colors.map(({ id, name }) => (
              <ColorPalette key={name} name={name} tokenId={id} />
            ))}
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection description="Pinterest name (common name)" title="Neutrals">
          <Flex direction="column">
            {neutrals.map(({ id, name }) => (
              <ColorPalette key={name} name={name} tokenId={id} />
            ))}
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection description="(common name)" title="Transparent">
          <Flex direction="column">
            {transparent.map(({ id, name }) => (
              <ColorPalette key={name} name={name} tokenId={id} />
            ))}
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
       The full extended palette of colors (colors, neutrals, and transparent) are the foundational elements of our color system or base color tokens. Base tokens are the lowest level tokens, which map directly to a value. Base tokens would likely be internal only and used to build our [semantic design tokens](/foundations/design_tokens).

       The full extended palette is available through design tokens and follow the naming pattern of \`color-{common_name}-{pinterest_name}-{number}\`. For example:

       - CSS \`var(--color-pink-flaminglow-400)\`

       The transparent color is just \`color-transparent\`.

       Using colors that are not available through our [semantic design tokens](/foundations/design_tokens) and components directly is considered an anti-pattern and should be avoided whenever possible. If it's absolutely necessary, a [hack on Box](/get_started/developers/hacking_gestalt#Box's-dangerouslySetInlineStyle) can be used.
      `}
          title="Colors in code"
        />
      </MainSection>
    </Page>
  );
}
