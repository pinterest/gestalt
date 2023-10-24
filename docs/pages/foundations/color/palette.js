// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import ColorPalette from '../../../docs-components/ColorPalette.js';
import ColorTile from '../../../docs-components/ColorTile.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

const colors = [
  { name: 'Pushpin', id: 'red', textColor: 'light' },
  { name: 'Flaminglow', id: 'pink', textColor: 'dark' },
  { name: 'Skycicle', id: 'blue', textColor: 'dark' },
  { name: 'Spabattical', id: 'teal', textColor: 'dark' },
  { name: 'Matchacado', id: 'green', textColor: 'dark' },
  { name: 'Mysticool', id: 'purple', textColor: 'light' },
  { name: 'Firetini', id: 'orange', textColor: 'dark' },
  { name: 'Caramellow', id: 'yellow', textColor: 'dark' },
];

const neutrals = [
  { name: 'Mochimalist', id: 'white', textColor: 'dark' },
  { name: 'Roboflow', id: 'gray', textColor: 'dark' },
  { name: 'Cosmicore', id: 'black', textColor: 'light' },
];

type ColorCardProps = {
  children: Node,
  colorScheme: 'light' | 'dark',
};
function ColorSchemeCard({ children, colorScheme }: ColorCardProps): Node {
  return (
    <Flex
      gap={{
        row: 4,
        column: 0,
      }}
    >
      <ColorSchemeProvider key={colorScheme} colorScheme={colorScheme} id={colorScheme}>
        <Box padding={4} color="default">
          <Flex
            gap={{
              row: 0,
              column: 4,
            }}
            direction="column"
          >
            <Text weight="bold" size="400" color="default">
              {colorScheme === 'light' ? 'Light mode' : 'Dark mode'}
            </Text>
            {children}
          </Flex>
        </Box>
      </ColorSchemeProvider>
    </Flex>
  );
}

export default function ColorPage(): Node {
  return (
    <Page title="Color palette">
      <PageHeader
        name="Color palette"
        description={`
        Our color palettes are shared between Brand and Gestalt, and represent our full range of options. The colors are divided into baseline, extended, and reserved colors.

        For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/).
        `}
        type="guidelines"
      />
      <MainSection
        name="Baseline colors"
        description={`
        Our baseline palette helps to create consistency across products.
        The baseline palette is comprised of our hero and neutrals colors, allowing the Pinterest content to shine, while ensuring enough color contrast. In addition, the colors used serve specific purposes in order to provide a better user experience. Check out [Color Usage](/foundations/color/usage) for more details about their intended usage.
        `}
      >
        <Flex
          gap={{
            row: 4,
            column: 0,
          }}
          wrap
        >
          <ColorSchemeCard colorScheme="light">
            <ColorTile
              fullTokenName="color-red-pushpin-450"
              description="Pushpin 450"
              number={450}
            />
            <ColorTile
              fullTokenName="color-black-cosmicore-900"
              description="Cosmicore 900"
              number={900}
            />
            <ColorTile
              fullTokenName="color-blue-skycicle-500"
              description="Skycicle 500"
              number={500}
            />
            <ColorTile
              fullTokenName="color-gray-roboflow-500"
              description="Roboflow 500"
              number={500}
            />
            <ColorTile
              fullTokenName="color-gray-roboflow-200"
              description="Roboflow 200"
              number={200}
            />
            <ColorTile
              fullTokenName="color-white-mochimalist-0"
              description="Mochimalist 0"
              number={0}
            />
          </ColorSchemeCard>
          <ColorSchemeCard colorScheme="dark">
            <ColorTile
              fullTokenName="color-red-pushpin-450"
              description="Pushpin 450"
              number={450}
            />
            <ColorTile
              fullTokenName="color-white-mochimalist-0"
              description="Mochimalist 0"
              number={0}
            />
            <ColorTile
              fullTokenName="color-blue-skycicle-300"
              description="Skycicle 300"
              number={300}
            />
            <ColorTile
              fullTokenName="color-gray-roboflow-300"
              description="Roboflow 300"
              number={300}
            />
            <ColorTile
              fullTokenName="color-gray-roboflow-500"
              description="Roboflow 500"
              number={500}
            />
            <ColorTile
              fullTokenName="color-black-cosmicore-900"
              description="Cosmicore 900"
              number={900}
            />
          </ColorSchemeCard>
        </Flex>
      </MainSection>
      <MainSection
        name="Extended palette"
        description={`
        The extended color palette displays all the available shades and tints of each color in the palette. The colors are named and numbered for easy reference. The usage of these colors varies depending on the product needs, but they come in handy for illustrations, communicating status, and brand moments.

        We aim to meet [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/), and in order to ensure accessible contrast for color pairings, we require our \`darkGray\` [Text](/web/text) color to be used for any colors 400 and below. For 500 and above, we recommend using \`white\`.
        `}
      >
        <MainSection.Subsection title="Colors">
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

        <MainSection.Subsection title="Neutrals">
          <Flex direction="column">
            {neutrals.map(({ id, name }) => (
              <ColorPalette key={name} name={name} tokenId={id} />
            ))}
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Reserved"
          description="The 450 colors are primarily reserved for Brand usage as they are among the least accessible colors. This set works best within larger brand moments, and is not commonly used for functional color pairings. While Pushpin 450 is our hero, primary product color, please only use other 450 colors when absolutely necessary while maintaining accessibility."
        >
          <Flex direction="column">
            {colors.map(({ id, name, textColor }) => (
              <ColorTile
                key={name}
                fullTokenName={`color-${id}-${name.toLowerCase()}-450`}
                description={`${name} 450`}
                textColor={textColor}
              />
            ))}
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Colors in code"
        description={`
       All colors in this palette are available through [design tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099) and follow the naming pattern of \`color-{common_name}-{pinterest_name}-{number}\`. For example:

       - JavaScript  \`$color-pink-flaminglow-400\`
       - CSS  \`var(--color-pink-flaminglow-400)\`

       Using colors that are not available through our [semantic design tokens](/foundations/design_tokens) and components directly is considered an anti-pattern and should be avoided whenever possible. If it's absolutely necessary, a [hack on Box](/get_started/developers/hacking_gestalt#Box's-dangerouslySetInlineStyle) can be used.
      `}
      />
    </Page>
  );
}
