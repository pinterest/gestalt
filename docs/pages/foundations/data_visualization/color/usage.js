// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, SlimBanner } from 'gestalt';
import ColorTile from '../../../../docs-components/ColorTile.js';
import MainSection from '../../../../docs-components/MainSection.js';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';
import DataViz2Colors from '../../../../graphics/data-viz-color-examples/dataViz2Colors.svg';
import DataViz3Colors from '../../../../graphics/data-viz-color-examples/dataViz3Colors.svg';
import DataViz4Colors from '../../../../graphics/data-viz-color-examples/dataViz4Colors.svg';
import DataViz6Colors from '../../../../graphics/data-viz-color-examples/dataViz6Colors.svg';
import DataViz8Colors from '../../../../graphics/data-viz-color-examples/dataViz8Colors.svg';
import DataVizPrimary from '../../../../graphics/data-viz-color-examples/dataVizPrimary.svg';
import DataVizSuccessError from '../../../../graphics/data-viz-color-examples/dataVizSuccessError.svg';

const COLOR_TEXT_PAIRINGS = {
  '01': 'light',
  '02': 'dark',
  '03': 'light',
  '04': 'dark',
  '05': 'dark',
  '06': 'default',
  '07': 'dark',
  '08': 'light',
  '09': 'dark',
  '10': 'light',
  '11': 'inverse',
  '12': 'inverse',
};

const DO_NOT_PAIR_COLORS = [
  [1, 8],
  [2, 6],
  [7, 9],
  [5, 3],
  [7, 6],
  [4, 9],
  [2, 7],
  [7, 11],
  [4, 6],
  [6, 11],
];

type ColorCardProps = {|
  count: number,
|};

function PaletteGenerator({ count }: ColorCardProps): Node {
  return [...Array(count)].map((step, idx) => {
    const tokenStep = idx + 1;

    return (
      <Box marginBottom={1} key={`color-${tokenStep}`}>
        <ColorTile
          textColor={COLOR_TEXT_PAIRINGS[`0${tokenStep}`]}
          description={`Data Visualization 0${tokenStep}`}
          fullTokenName={`color-data-visualization-0${tokenStep}`}
        />
      </Box>
    );
  });
}

type PairSetProps = {|
  color1: number,
  color2: number,
|};

function DoNotPairSet({ color1, color2 }: PairSetProps): Node {
  const firstColor = color1 < 10 ? `0${color1}` : `${color1}`;
  const secondColor = color2 < 10 ? `0${color2}` : `${color2}`;
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 1,
      }}
    >
      <ColorTile
        textColor={COLOR_TEXT_PAIRINGS[firstColor]}
        description={`Data Visualization ${firstColor}`}
        fullTokenName={`color-data-visualization-${firstColor}`}
      />
      <ColorTile
        textColor={COLOR_TEXT_PAIRINGS[secondColor]}
        description={`Data Visualization ${secondColor}`}
        fullTokenName={`color-data-visualization-${secondColor}`}
      />
    </Flex>
  );
}

export default function ColorPage(): Node {
  return (
    <Page title="Data visualization guidelines">
      <PageHeader
        name="Data visualization guidelines"
        type="guidelines"
        description="Details about approved color pairings, accessibility guidelines, and pairings to avoid. The [data visualization palette](/foundations/data_visualization/color/palette) can be implemented through our [design tokens](/foundations/design_tokens#Data-visualization)."
      />
      <MainSection
        name="Primary color"
        description="We use `$color-data-visualization-primary` as the main color for data visualization, which is used for showing total value or whenever only 1 color is needed in a visualization."
      >
        <Flex
          gap={{
            row: 0,
            column: 8,
          }}
          direction="column"
        >
          <ColorTile
            textColor="dark"
            description="Primary"
            fullTokenName="color-data-visualization-primary"
          />

          <DataVizPrimary />
        </Flex>
      </MainSection>
      <MainSection
        name="Semantic colors"
        description="Semantic colors are used to indicate positive or negative performance in data. In both cases, we use a slightly darker color for text and icons associated with data to make sure text has enough contrast."
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Flex wrap gap={4}>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
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
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <ColorTile
                textColor="inverse"
                description="Error (Graph)"
                fullTokenName="color-data-visualization-error-graph"
              />
              <ColorTile
                textColor="inverse"
                description="Error (Text/Icon)"
                fullTokenName="color-data-visualization-error-text"
              />
            </Flex>
          </Flex>

          <DataVizSuccessError />
        </Flex>
      </MainSection>
      <MainSection
        name="Color pairings"
        description="When more than 1 color is needed, colors should be applied in the exact order in the palette to maximize contrast between adjacent colors, in order to help with visual differentiation."
      >
        <MainSection.Subsection title="2 colors">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <PaletteGenerator count={2} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz2Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="3 colors">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <PaletteGenerator count={3} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz3Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="4 colors">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <PaletteGenerator count={4} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz4Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="6 colors">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <PaletteGenerator count={6} />
            </Flex>
            <Box marginBottom={10}>
              <DataViz6Colors />
            </Box>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="8 colors">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
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
        Although we recommend using colors following the order in the palette, we understand there might be edge cases when we need to pair colors differently. In this case, avoid using the pairings below as neighboring colors. These pairings are hard to tell apart when used:

        - for lines or small points under normal vision
        - for large areas under red-green or yellow-blue color blindness`}
      >
        {' '}
        <Flex gap={6} direction="column">
          <Flex
            wrap
            gap={{
              row: 4,
              column: 5,
            }}
          >
            {DO_NOT_PAIR_COLORS.map((set) => (
              <DoNotPairSet key={set.toString()} color1={set[0]} color2={set[1]} />
            ))}
          </Flex>
          <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
            message="Example of how a person with green-red color blindness might see these pairings"
          />
          <Box maxWidth={620} maxHeight={620}>
            <Image
              alt="Color pairings shown with deuteranopia"
              naturalHeight={1106}
              naturalWidth={1082}
              src="https://i.ibb.co/zhf8MHC/color-pairings-img-1-20.png"
            />
          </Box>
        </Flex>
      </MainSection>
    </Page>
  );
}
