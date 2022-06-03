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
            textColor="light"
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
                  textColor="light"
                  description="Success (Graph)"
                  fullTokenName="color-data-visualization-success-graph"
                />
                <ColorTile
                  textColor="light"
                  description="Success (Text/Icon)"
                  fullTokenName="color-data-visualization-success-text"
                />
              </Flex>
            </Box>
            <ColorTile
              textColor="light"
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
              {[...Array(2)].map((step, idx) => (
                <ColorTile
                  key={`${idx}`}
                  textColor="light"
                  description={`Data Visualization 0${idx + 1}`}
                  fullTokenName={`color-data-visualization-0${idx + 1}`}
                />
              ))}
            </Flex>
            <DataViz2Colors />
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="3 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              {[...Array(3)].map((step, idx) => (
                <ColorTile
                  key={`${idx}`}
                  textColor="light"
                  description={`Data Visualization 0${idx + 1}`}
                  fullTokenName={`color-data-visualization-0${idx + 1}`}
                />
              ))}
            </Flex>
            <DataViz3Colors />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="4 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              {[...Array(4)].map((step, idx) => (
                <ColorTile
                  key={`${idx}`}
                  textColor="light"
                  description={`Data Visualization 0${idx + 1}`}
                  fullTokenName={`color-data-visualization-0${idx + 1}`}
                />
              ))}
            </Flex>
            <DataViz4Colors />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="6 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              {[...Array(6)].map((step, idx) => (
                <ColorTile
                  key={`${idx}`}
                  textColor="light"
                  description={`Data Visualization 0${idx + 1}`}
                  fullTokenName={`color-data-visualization-0${idx + 1}`}
                />
              ))}
            </Flex>
            <DataViz6Colors />
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="8 colors">
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={1}>
              {[...Array(8)].map((step, idx) => (
                <ColorTile
                  key={`${idx}`}
                  textColor="light"
                  description={`Data Visualization 0${idx + 1}`}
                  fullTokenName={`color-data-visualization-0${idx + 1}`}
                />
              ))}
            </Flex>
            <DataViz8Colors />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Pairings to avoid"
        description="Although we recommend using colors following the order in the palette, we understand there might be edge cases when we need to pair colors in a different way. The color pairings below are hard to tell apart either in lines or small points under normal vision, or in large areas under red-green or yellow-blue color blindness. Always avoid using these pairings as neighboring colors."
      />
    </Page>
  );
}
