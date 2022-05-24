// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import ColorPalette from '../components/ColorPalette.js';
import ColorTile from '../components/ColorTile.js';
import Page from '../components/Page.js';

const MAIN_STEPS = ['01', '02', '03', '04', '05', '06'];
const EXTENDED_STEPS = ['07', '08', '09', '10', '11', '12'];

export default function ColorPage(): Node {
  return (
    <Page title="Color palette">
      <PageHeader
        name="Color palette"
        description={`The data visualization color palette is used to represent discrete categories of data. This palette utilizes Gestalt color palette and is optimized for improving accessibility in data visualizations. The palette is comprised of a 12-color categorical palette and semantic colors.  `}
        showSourceLink={false}
      />
      <MainSection
        name="12-Color categorical palette"
        description={`
        This palette helps create a consistent brand image among visualizations across Pinterest products, while ensuring enough color contrast against background and between individual colors. There are 12 colors in the palette, and is divided into a main palette and an extended palette.

        - The colors in the main palette are used in most cases.
        - Use the extended palette only when more than 6 colors are needed.
        - When there is only 1 color needed in a visualization, always use Data Visualization #05, which is reserved for showing total value.
        - When more than 1 color is needed, colors should be applied in the exact order in the palette to maximize contrast between adjacent colors, in order to help with visual differentiation.
        `}
      >
        <MainSection.Subsection title="Light mode">
          <ColorSchemeProvider colorScheme={'light'} id={'light'}>
            <Box color="default" padding={4}>
              <Flex wrap gap={4}>
                <Flex direction="column" gap={4}>
                  <Text weight="bold">Main palette</Text>
                  <Flex direction="column" gap={1}>
                    {MAIN_STEPS.map((step) => (
                      <ColorTile
                        textColor="light"
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
                        textColor="light"
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
        <MainSection.Subsection title="Light mode">
          <ColorSchemeProvider colorScheme={'dark'} id={'dark'}>
            <Box color="default" padding={4}>
              <Flex wrap gap={4}>
                <Flex direction="column" gap={4}>
                  <Text weight="bold">Main palette</Text>
                  <Flex direction="column" gap={1}>
                    {MAIN_STEPS.map((step) => (
                      <ColorTile
                        textColor={step === '03' || step === '05' ? 'light' : 'dark'}
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
                        textColor={step === '09' || step === '12' ? 'light' : 'dark'}
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
    </Page>
  );
}
