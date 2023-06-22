// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Heading, Text } from 'gestalt';
import ColorTile from '../../../../docs-components/ColorTile.js';
import MainSection from '../../../../docs-components/MainSection.js';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter.js';

const MAIN_STEPS = [
  { name: '01', lightText: 'light', darkText: 'light' },
  { name: '02', lightText: 'dark', darkText: 'dark' },
  { name: '03', lightText: 'light', darkText: 'dark' },
  { name: '04', lightText: 'dark', darkText: 'dark' },
  { name: '05', lightText: 'dark', darkText: 'dark' },
  { name: '06', lightText: 'dark', darkText: 'light' },
];
const EXTENDED_STEPS = [
  { name: '07', lightText: 'dark', darkText: 'dark' },
  { name: '08', lightText: 'light', darkText: 'light' },
  { name: '09', lightText: 'dark', darkText: 'dark' },
  { name: '10', lightText: 'light', darkText: 'light' },
  { name: '11', lightText: 'light', darkText: 'dark' },
  { name: '12', lightText: 'light', darkText: 'dark' },
];

type ColorCardProps = {|
  colorScheme: 'light' | 'dark',
|};
function SemanticThemeExample({ colorScheme }: ColorCardProps): Node {
  return (
    <ColorSchemeProvider colorScheme={colorScheme} id={colorScheme}>
      <Box color="default" padding={4}>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Heading size="400">{capitalizeFirstLetter(colorScheme)} mode</Heading>
          <Flex direction="column">
            <ColorTile
              textColor={colorScheme}
              description="Success (Graph)"
              fullTokenName="color-data-visualization-success-graph"
            />
            <ColorTile
              textColor={colorScheme}
              description="Success (Text/Icon)"
              fullTokenName="color-data-visualization-success-text"
            />
          </Flex>
          <Flex direction="column">
            <ColorTile
              textColor={colorScheme}
              description="Error (Graph)"
              fullTokenName="color-data-visualization-error-graph"
            />
            <ColorTile
              textColor={colorScheme}
              description="Error (Text/Icon)"
              fullTokenName="color-data-visualization-error-text"
            />
          </Flex>
        </Flex>
        <Flex />
      </Box>
    </ColorSchemeProvider>
  );
}

function getColorTiles(
  colors: $ReadOnlyArray<{| darkText: string, lightText: string, name: string |}>,
  mode: string = 'light',
): Node {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 1,
      }}
    >
      {colors.map((step) => (
        <ColorTile
          key={`${step.name}`}
          textColor={step[`${mode}Text`]}
          description={`Data Visualization ${step.name}`}
          fullTokenName={`color-data-visualization-${step.name}`}
        />
      ))}
    </Flex>
  );
}

export default function ColorPage(): Node {
  return (
    <Page title="Data visualization color palette">
      <PageHeader
        name="Data visualization color palette"
        description="The data visualization color palette is used to represent discrete categories of data. This palette utilizes the Gestalt color palette and is optimized for accessibility in data visualizations. The palette is comprised of a 12-color categorical palette, along with a few semantic colors. It can be implemented through our [design tokens](/foundations/design_tokens#Data-visualization)."
        type="guidelines"
      />
      <MainSection
        name="12-Color categorical palette"
        description={`
        This palette helps create a consistent brand image among visualizations across Pinterest products, while ensuring enough color contrast against background and between individual colors. There are 12 colors in the palette, divided into a main palette and an extended palette.

        - The colors in the main palette are used in most cases.
        - Use the extended palette only when more than 6 colors are needed.
        - When there is only 1 color needed in a visualization, always use Data Visualization #05, which is reserved for showing total value.
        - When more than 1 color is needed, colors should be applied in the exact order in the palette to maximize contrast between adjacent colors, in order to help with visual differentiation.
        `}
      >
        <MainSection.Subsection title="Light mode">
          <ColorSchemeProvider colorScheme="light" id="light">
            <Box color="default" padding={4} display="inlineBlock">
              <Flex
                wrap
                gap={{
                  row: 4,
                  column: 8,
                }}
              >
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 4,
                  }}
                >
                  <Text weight="bold">Main palette</Text>
                  {getColorTiles(MAIN_STEPS)}
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 4,
                  }}
                >
                  <Text weight="bold">Extended palette</Text>
                  {getColorTiles(EXTENDED_STEPS)}
                </Flex>
              </Flex>
            </Box>
          </ColorSchemeProvider>
        </MainSection.Subsection>
        <MainSection.Subsection title="Dark mode">
          <ColorSchemeProvider colorScheme="dark" id="dark">
            <Box color="default" padding={4} display="inlineBlock">
              <Flex
                wrap
                gap={{
                  row: 4,
                  column: 8,
                }}
                flex="none"
              >
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 4,
                  }}
                >
                  <Text weight="bold">Main palette</Text>
                  {getColorTiles(MAIN_STEPS, 'dark')}
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 4,
                  }}
                >
                  <Text weight="bold">Extended palette</Text>
                  {getColorTiles(EXTENDED_STEPS, 'dark')}
                </Flex>
              </Flex>
            </Box>
          </ColorSchemeProvider>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Semantic colors"
        description="Semantic colors are used to indicate trends in performance data. For successful trends, we use a slightly darker green color for text or icons associated with data to ensure the text has enough contrast."
      >
        <Flex wrap gap={4}>
          <SemanticThemeExample colorScheme="light" />
          <SemanticThemeExample colorScheme="dark" />
        </Flex>
      </MainSection>
    </Page>
  );
}
