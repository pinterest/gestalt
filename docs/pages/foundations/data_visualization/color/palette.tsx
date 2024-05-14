import { Box, ColorSchemeProvider, Flex, Heading, Text } from 'gestalt';
import {
  TOKEN_COLOR_DATA_VISUALIZATION_01,
  TOKEN_COLOR_DATA_VISUALIZATION_02,
  TOKEN_COLOR_DATA_VISUALIZATION_03,
  TOKEN_COLOR_DATA_VISUALIZATION_04,
  TOKEN_COLOR_DATA_VISUALIZATION_05,
  TOKEN_COLOR_DATA_VISUALIZATION_06,
  TOKEN_COLOR_DATA_VISUALIZATION_07,
  TOKEN_COLOR_DATA_VISUALIZATION_08,
  TOKEN_COLOR_DATA_VISUALIZATION_09,
  TOKEN_COLOR_DATA_VISUALIZATION_10,
  TOKEN_COLOR_DATA_VISUALIZATION_11,
  TOKEN_COLOR_DATA_VISUALIZATION_12,
  TOKEN_COLOR_DATA_VISUALIZATION_ERROR_GRAPH,
  TOKEN_COLOR_DATA_VISUALIZATION_ERROR_TEXT,
  TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_GRAPH,
  TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_TEXT,
} from 'gestalt-design-tokens';
import ColorTile from '../../../../docs-components/ColorTile';
import MainSection from '../../../../docs-components/MainSection';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';

const MAIN_STEPS = [
  {
    name: '01',
    token: TOKEN_COLOR_DATA_VISUALIZATION_01,
    lightText: 'light',
    darkText: 'light',
  },
  {
    name: '02',
    token: TOKEN_COLOR_DATA_VISUALIZATION_02,
    lightText: 'dark',
    darkText: 'dark',
  },
  {
    name: '03',
    token: TOKEN_COLOR_DATA_VISUALIZATION_03,
    lightText: 'light',
    darkText: 'dark',
  },
  { name: '04', token: TOKEN_COLOR_DATA_VISUALIZATION_04, lightText: 'dark', darkText: 'dark' },
  { name: '05', token: TOKEN_COLOR_DATA_VISUALIZATION_05, lightText: 'dark', darkText: 'dark' },
  { name: '06', token: TOKEN_COLOR_DATA_VISUALIZATION_06, lightText: 'dark', darkText: 'light' },
];
const EXTENDED_STEPS = [
  {
    name: '07',
    token: TOKEN_COLOR_DATA_VISUALIZATION_07,
    lightText: 'dark',
    darkText: 'dark',
  },
  { name: '08', token: TOKEN_COLOR_DATA_VISUALIZATION_08, lightText: 'light', darkText: 'light' },
  { name: '09', token: TOKEN_COLOR_DATA_VISUALIZATION_09, lightText: 'dark', darkText: 'dark' },
  { name: '10', token: TOKEN_COLOR_DATA_VISUALIZATION_10, lightText: 'light', darkText: 'light' },
  { name: '11', token: TOKEN_COLOR_DATA_VISUALIZATION_11, lightText: 'light', darkText: 'dark' },
  { name: '12', token: TOKEN_COLOR_DATA_VISUALIZATION_12, lightText: 'light', darkText: 'dark' },
];

function SemanticThemeExample({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
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
              description="Success (Graph)"
              textColor={colorScheme}
              token={TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_GRAPH}
            />
            <ColorTile
              description="Success (Text/Icon)"
              textColor={colorScheme}
              token={TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_TEXT}
            />
          </Flex>
          <Flex direction="column">
            <ColorTile
              description="Error (Graph)"
              textColor={colorScheme}
              token={TOKEN_COLOR_DATA_VISUALIZATION_ERROR_GRAPH}
            />
            <ColorTile
              description="Error (Text/Icon)"
              textColor={colorScheme}
              token={TOKEN_COLOR_DATA_VISUALIZATION_ERROR_TEXT}
            />
          </Flex>
        </Flex>
        <Flex />
      </Box>
    </ColorSchemeProvider>
  );
}

function getColorTiles(
  colors: ReadonlyArray<{
    darkText: string;
    lightText: string;
    token: string;
    name: string;
  }>,
  mode: string = 'light',
) {
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
          description={`Data Visualization ${step.name}`}
          // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type '`${string}Text`' can't be used to index type '{ darkText: string; lightText: string; token: string; name: string; }'.
          textColor={step[`${mode}Text`]}
          token={step.token}
        />
      ))}
    </Flex>
  );
}

export default function ColorPage() {
  return (
    <Page title="Data visualization color palette">
      <PageHeader
        description="The data visualization color palette is used to represent discrete categories of data. This palette utilizes the Gestalt color palette and is optimized for accessibility in data visualizations. The palette is comprised of a 12-color categorical palette, along with a few semantic colors. It can be implemented through our [design tokens](/foundations/design_tokens/overview#Data-visualization)."
        name="Data visualization color palette"
        type="guidelines"
      />
      <MainSection
        description={`
        This palette helps create a consistent brand image among visualizations across Pinterest products, while ensuring enough color contrast against background and between individual colors. There are 12 colors in the palette, divided into a main palette and an extended palette.

        - The colors in the main palette are used in most cases.
        - Use the extended palette only when more than 6 colors are needed.
        - When there is only 1 color needed in a visualization, always use Data Visualization #05, which is reserved for showing total value.
        - When more than 1 color is needed, colors should be applied in the exact order in the palette to maximize contrast between adjacent colors, in order to help with visual differentiation.
        `}
        name="12-Color categorical palette"
      >
        <MainSection.Subsection title="Light mode">
          <ColorSchemeProvider colorScheme="light" id="light">
            <Box color="default" display="inlineBlock" padding={4}>
              <Flex
                gap={{
                  row: 4,
                  column: 8,
                }}
                wrap
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
            <Box color="default" display="inlineBlock" padding={4}>
              <Flex
                flex="none"
                gap={{
                  row: 4,
                  column: 8,
                }}
                wrap
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
        description="Semantic colors are used to indicate trends in performance data. For successful trends, we use a slightly darker green color for text or icons associated with data to ensure the text has enough contrast."
        name="Semantic colors"
      >
        <Flex gap={4} wrap>
          <SemanticThemeExample colorScheme="light" />
          <SemanticThemeExample colorScheme="dark" />
        </Flex>
      </MainSection>
    </Page>
  );
}
