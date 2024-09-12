import { BannerSlim, Box, Flex, Image } from 'gestalt';
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
  TOKEN_COLOR_DATA_VISUALIZATION_PRIMARY,
  TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_GRAPH,
  TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_TEXT,
} from 'gestalt-design-tokens';
import ColorTile from '../../../../docs-components/ColorTile';
import MainSection from '../../../../docs-components/MainSection';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';
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
} as const;

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
] as const;

const MAP = {
  '1': TOKEN_COLOR_DATA_VISUALIZATION_01,
  '2': TOKEN_COLOR_DATA_VISUALIZATION_02,
  '3': TOKEN_COLOR_DATA_VISUALIZATION_03,
  '4': TOKEN_COLOR_DATA_VISUALIZATION_04,
  '5': TOKEN_COLOR_DATA_VISUALIZATION_05,
  '6': TOKEN_COLOR_DATA_VISUALIZATION_06,
  '7': TOKEN_COLOR_DATA_VISUALIZATION_07,
  '8': TOKEN_COLOR_DATA_VISUALIZATION_08,
  '9': TOKEN_COLOR_DATA_VISUALIZATION_09,
  '10': TOKEN_COLOR_DATA_VISUALIZATION_10,
  '11': TOKEN_COLOR_DATA_VISUALIZATION_11,
  '12': TOKEN_COLOR_DATA_VISUALIZATION_12,
} as const;

type ColorCardProps = {
  count: number;
};

function PaletteGenerator({ count }: ColorCardProps) {
  return (
    <Box>
      {[...Array(count)].map((step, idx) => {
        const tokenStep = idx + 1;

        return (
          <Box key={`color-${tokenStep}`} marginBottom={1}>
            <ColorTile
              description={`Data Visualization 0${tokenStep}`}
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type '`0${number}`' can't be used to index type '{ readonly '01': "light"; readonly '02': "dark"; readonly '03': "light"; readonly '04': "dark"; readonly '05': "dark"; readonly '06': "default"; readonly '07': "dark"; readonly '08': "light"; readonly '09': "dark"; readonly '10': "light"; readonly '11': "inverse"; readonly '12': "inverse"; }'.
              textColor={COLOR_TEXT_PAIRINGS[`0${tokenStep}`]}
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '1': "var(--color-data-visualization-01)"; readonly '2': "var(--color-data-visualization-02)"; readonly '3': "var(--color-data-visualization-03)"; readonly '4': "var(--color-data-visualization-04)"; ... 7 more ...; readonly '12': "var(--color-data-visualization-12)"; }'.
              token={MAP[tokenStep]}
            />
          </Box>
        );
      })}
    </Box>
  );
}

type PairSetProps = {
  color1: number;
  color2: number;
};

function DoNotPairSet({ color1, color2 }: PairSetProps) {
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
        description={`Data Visualization ${firstColor}`}
        // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '01': "light"; readonly '02': "dark"; readonly '03': "light"; readonly '04': "dark"; readonly '05': "dark"; readonly '06': "default"; readonly '07': "dark"; readonly '08': "light"; readonly '09': "dark"; readonly '10': "light"; readonly '11': "inverse"; readonly '12': "inverse"; }'.
        textColor={COLOR_TEXT_PAIRINGS[firstColor]}
        // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '1': "var(--color-data-visualization-01)"; readonly '2': "var(--color-data-visualization-02)"; readonly '3': "var(--color-data-visualization-03)"; readonly '4': "var(--color-data-visualization-04)"; ... 7 more ...; readonly '12': "var(--color-data-visualization-12)"; }'.
        token={MAP[color1]}
      />
      <ColorTile
        description={`Data Visualization ${secondColor}`}
        // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '01': "light"; readonly '02': "dark"; readonly '03': "light"; readonly '04': "dark"; readonly '05': "dark"; readonly '06': "default"; readonly '07': "dark"; readonly '08': "light"; readonly '09': "dark"; readonly '10': "light"; readonly '11': "inverse"; readonly '12': "inverse"; }'.
        textColor={COLOR_TEXT_PAIRINGS[secondColor]}
        // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '1': "var(--color-data-visualization-01)"; readonly '2': "var(--color-data-visualization-02)"; readonly '3': "var(--color-data-visualization-03)"; readonly '4': "var(--color-data-visualization-04)"; ... 7 more ...; readonly '12': "var(--color-data-visualization-12)"; }'.
        token={MAP[color2]}
      />
    </Flex>
  );
}

export default function ColorPage() {
  return (
    <Page title="Data visualization guidelines">
      <PageHeader
        description="Details about approved color pairings, accessibility guidelines, and pairings to avoid. The [data visualization palette](/foundations/data_visualization/color/palette) can be implemented through our [design tokens](/foundations/design_tokens/overview#Data-visualization)."
        name="Data visualization guidelines"
        type="guidelines"
      />
      <MainSection
        description="We use `$color-data-visualization-primary` as the main color for data visualization, which is used for showing total value or whenever only 1 color is needed in a visualization."
        name="Primary color"
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 8,
          }}
        >
          <ColorTile
            description="Primary"
            textColor="dark"
            token={TOKEN_COLOR_DATA_VISUALIZATION_PRIMARY}
          />

          <DataVizPrimary />
        </Flex>
      </MainSection>
      <MainSection
        description="Semantic colors are used to indicate positive or negative performance in data. In both cases, we use a slightly darker color for text and icons associated with data to make sure text has enough contrast."
        name="Semantic colors"
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Flex gap={4} wrap>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 1,
              }}
            >
              <ColorTile
                description="Success (Graph)"
                textColor="inverse"
                token={TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_GRAPH}
              />
              <ColorTile
                description="Success (Text/Icon)"
                textColor="inverse"
                token={TOKEN_COLOR_DATA_VISUALIZATION_SUCCESS_TEXT}
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
                description="Error (Graph)"
                textColor="inverse"
                token={TOKEN_COLOR_DATA_VISUALIZATION_ERROR_GRAPH}
              />
              <ColorTile
                description="Error (Text/Icon)"
                textColor="inverse"
                token={TOKEN_COLOR_DATA_VISUALIZATION_ERROR_TEXT}
              />
            </Flex>
          </Flex>

          <DataVizSuccessError />
        </Flex>
      </MainSection>
      <MainSection
        description="When more than 1 color is needed, colors should be applied in the exact order in the palette to maximize contrast between adjacent colors, in order to help with visual differentiation."
        name="Color pairings"
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
        description={`
        Although we recommend using colors following the order in the palette, we understand there might be edge cases when we need to pair colors differently. In this case, avoid using the pairings below as neighboring colors. These pairings are hard to tell apart when used:

        - for lines or small points under normal vision
        - for large areas under red-green or yellow-blue color blindness`}
        name="Pairings to avoid"
      >
        {' '}
        <Flex direction="column" gap={6}>
          <Flex
            gap={{
              row: 4,
              column: 5,
            }}
            wrap
          >
            {DO_NOT_PAIR_COLORS.map((set) => (
              <DoNotPairSet key={set.toString()} color1={set[0]} color2={set[1]} />
            ))}
          </Flex>
          <BannerSlim
            iconAccessibilityLabel="Info"
            message="Example of how a person with green-red color blindness might see these pairings"
            type="info"
          />
          <Box maxHeight={620} maxWidth={620}>
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
