// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import ColorTile from '../components/ColorTile.js';
import Page from '../components/Page.js';
import DataVizPrimary from '../graphics/color-examples/dataVizPrimary.svg';
import DataVizSuccessError from '../graphics/color-examples/dataVizSuccessError.svg';
import DataViz2Colors from '../graphics/color-examples/dataViz2Colors.svg';
import DataViz3Colors from '../graphics/color-examples/dataViz3Colors.svg';
import DataViz4Colors from '../graphics/color-examples/dataViz4Colors.svg';
import DataViz6Colors from '../graphics/color-examples/dataViz6Colors.svg';
import DataViz8Colors from '../graphics/color-examples/dataViz8Colors.svg';

type ColorCardProps = {|
  count: number,
|};
function PaletteGenerator({ count }: ColorCardProps): Node {
  return [...Array(count)].map((step, idx) => {
    const tokenStep = idx + 1;
    return (
      <Box marginBottom={1} key={`color-${idx}`}>
        <ColorTile
          textColor={tokenStep === 1 || tokenStep === 2 ? 'dark' : 'inverse'}
          description={`Data Visualization 0${tokenStep}`}
          fullTokenName={`color-data-visualization-0${tokenStep}`}
        />
      </Box>
    );
  });
}

export default function ColorPage(): Node {
  return (
    <Page title="Data visualization guidelines">
      <PageHeader name="Data visualization guidelines" showSourceLink={false} />
      <MainSection
        name="Primary color"
        description="We use `$color-data-visualization-primary` as the main color for data visualization, which is used for showing total value or whenever only 1 color is needed in a visualization."
      >
        <Flex gap={8} direction="column">
          <ColorTile
            textColor="inverse"
            description="Primary"
            fullTokenName="color-data-visualization-primary"
          />

          <DataVizPrimary />
        </Flex>
      </MainSection>
      <MainSection
        name="Semantic colors"
        description="Semantic colors are used to indicate positive or negative performance in data. For positive color, we use a slightly darker Matchacado color for text/icon associated with data to make sure text has enough contrast."
      >
        <Flex direction="column" gap={4}>
          <Flex wrap gap={4}>
            <Box marginBottom={4}>
              <Flex direction="column" gap={1}>
                <ColorTile
                  textColor="inverse"
                  description="Success (Graph)"
                  fullTokenName="color-data-visualization-success-graph"
                />
                <ColorTile
                  textColor="inverse"
                  description="Success (Text/Icon)"
                  fullTokenName="color-data-visualization-success-text"
                />
              </Flex>
            </Box>
            <ColorTile
              textColor="inverse"
              description="Error (Graph and Text)"
              fullTokenName="color-data-visualization-error"
            />
          </Flex>

          <DataVizSuccessError />
        </Flex>
      </MainSection>
      <MainSection
        name="Color pairings"
        description="When more than 1 color is needed, colors should be applied in the exact order in the palette to maximize contrast between adjacent colors, in order to help with visual differentiation."
      >
        <MainSection.Subsection title="2 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              <PaletteGenerator count={2} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz2Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="3 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              <PaletteGenerator count={3} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz3Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="4 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              <PaletteGenerator count={4} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz4Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="6 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              <PaletteGenerator count={6} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz6Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="8 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              <PaletteGenerator count={8} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz8Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Pairings to avoid"
        description={`
        Although we recommend using colors following the order in the palette, we understand there might be edge cases when we need to pair colors in a different way. In this case, avoid using the pairings below as neighboring colors. These pairings are hard to tell apart when used

        - for lines or small points under normal vision
        - for large areas under red-green or yellow-blue color blindness`}
      >
        <Flex gap={6} wrap>
          <Flex direction="column" gap={6}>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="inverse"
                description="Data Visualization 04"
                fullTokenName="color-data-visualization-04"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 08"
                fullTokenName="color-data-visualization-08"
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="dark"
                description="Data Visualization 01"
                fullTokenName="color-data-visualization-01"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 11"
                fullTokenName="color-data-visualization-11"
              />
            </Flex>

            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="dark"
                description="Data Visualization 02"
                fullTokenName="color-data-visualization-02"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 04"
                fullTokenName="color-data-visualization-04"
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="inverse"
                description="Data Visualization 03"
                fullTokenName="color-data-visualization-03"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 05"
                fullTokenName="color-data-visualization-05"
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="inverse"
                description="Data Visualization 08"
                fullTokenName="color-data-visualization-08"
              />
              {/* Margin bottom used for spacing when these columns wrap */}
              <Box marginBottom={6}>
                <ColorTile
                  textColor="inverse"
                  description="Data Visualization 11"
                  fullTokenName="color-data-visualization-11"
                />
              </Box>
            </Flex>
          </Flex>
          <Flex direction="column" gap={6}>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="inverse"
                description="Data Visualization 07"
                fullTokenName="color-data-visualization-07"
              />
              <ColorTile
                textColor="dark"
                description="Data Visualization 10"
                fullTokenName="color-data-visualization-10"
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="inverse"
                description="Data Visualization 07"
                fullTokenName="color-data-visualization-07"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 11"
                fullTokenName="color-data-visualization-11"
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="inverse"
                description="Data Visualization 04"
                fullTokenName="color-data-visualization-04"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 11"
                fullTokenName="color-data-visualization-11"
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <ColorTile
                textColor="dark"
                description="Data Visualization 01"
                fullTokenName="color-data-visualization-01"
              />
              <ColorTile
                textColor="inverse"
                description="Data Visualization 04"
                fullTokenName="color-data-visualization-04"
              />
            </Flex>
          </Flex>
        </Flex>
      </MainSection>
    </Page>
  );
}
