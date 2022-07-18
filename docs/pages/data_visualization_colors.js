// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Heading, Text } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import ColorTile from '../components/ColorTile.js';
import Page from '../components/Page.js';
import { capitalizeFirstLetter } from '../components/utils.js';

const MAIN_STEPS = ['01', '02', '03', '04', '05', '06'];
const EXTENDED_STEPS = ['07', '08', '09', '10', '11', '12'];

type ColorCardProps = {|
  colorScheme: 'light' | 'dark',
|};
function SemanticThemeExample({ colorScheme }: ColorCardProps): Node {
  return (
    <ColorSchemeProvider colorScheme={colorScheme} id={colorScheme}>
      <Box color="default" padding={4}>
        <Flex direction="column" gap={4}>
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
          <ColorTile
            textColor={colorScheme}
            description="Error (Graph and Text)"
            fullTokenName="color-data-visualization-error"
          />
        </Flex>
        <Flex />
      </Box>
    </ColorSchemeProvider>
  );
}

export default function ColorPage(): Node {
  return (
    <Page title="Data visualization color palette">
      <PageHeader
        name="Data visualization color palette"
        description="The data visualization color palette is used to represent discrete categories of data. This palette utilizes the Gestalt color palette and is optimized for accessibility in data visualizations. The palette is comprised of a 12-color categorical palette, along with a few semantic colors. It can be implemented through our [design tokens](/design_tokens#Data-visualization)."
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
              <Flex wrap gap={4}>
                <Flex direction="column" gap={4}>
                  <Text weight="bold">Main palette</Text>
                  <Flex direction="column" gap={1}>
                    {MAIN_STEPS.map((step) => (
                      <ColorTile
                        key={`${step}`}
                        textColor={step === '01' || step === '02' ? 'dark' : 'light'}
                        description={`Data Visualization ${step}`}
                        fullTokenName={`color-data-visualization-${step}`}
                      />
                    ))}
                  </Flex>
                </Flex>
                <Flex direction="column" gap={4}>
                  <Text weight="bold">Extended palette</Text>
                  <Flex direction="column" gap={1}>
                    {EXTENDED_STEPS.map((step) => (
                      <ColorTile
                        key={`${step}`}
                        textColor={step === '10' ? 'dark' : 'light'}
                        description={`Data Visualization ${step}`}
                        fullTokenName={`color-data-visualization-${step}`}
                      />
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </ColorSchemeProvider>
        </MainSection.Subsection>
        <MainSection.Subsection title="Dark mode">
          <ColorSchemeProvider colorScheme="dark" id="dark">
            <Box color="default" padding={4} display="inlineBlock">
              <Flex wrap gap={4} flex="none">
                <Flex direction="column" gap={4}>
                  <Text weight="bold">Main palette</Text>
                  <Flex direction="column" gap={1}>
                    {MAIN_STEPS.map((step) => (
                      <ColorTile
                        key={`${step}`}
                        textColor="dark"
                        description={`Data Visualization ${step}`}
                        fullTokenName={`color-data-visualization-${step}`}
                      />
                    ))}
                  </Flex>
                </Flex>
                <Flex direction="column" gap={4}>
                  <Text weight="bold">Extended palette</Text>
                  <Flex direction="column" gap={1}>
                    {EXTENDED_STEPS.map((step) => (
                      <ColorTile
                        key={`${step}`}
                        textColor={step === '12' ? 'light' : 'dark'}
                        description={`Data Visualization ${step}`}
                        fullTokenName={`color-data-visualization-${step}`}
                      />
                    ))}
                  </Flex>
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
        <Flex>
          <SemanticThemeExample colorScheme="light" />
          <SemanticThemeExample colorScheme="dark" />
        </Flex>
      </MainSection>
    </Page>
  );
}
