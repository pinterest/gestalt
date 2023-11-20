// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Image } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import chartgraph from '../../../examples/chartgraph/main';
import tiledata from '../../../examples/tiledata/main';

export default function DocsPage(): ReactNode {
  return (
    <Page title="Available data visualization components">
      <PageHeader name="Available data visualization components" type="guidelines" />

      <MainSection name="Components">
        <MainSection.Subsection
          title="ChartGraph"
          description={`ChartGraph is used for displaying various types of graphs plotted on an x and y axis. It makes it easier to identify and understand patterns over time across different categories, enabling people to make informed decisions quickly.

[Go to the ChartGraph component](/web/chartgraph)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={chartgraph} name="ChartGraph example" hideEditor />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="TileData"
          description={`TileData enables users to select a multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points.

[Go to the TileData component](/web/tiledata)`}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tiledata} name="TileData example" hideEditor />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Datapoint"
          description={`Datapoint displays at-a-glance data for a user to quickly view key metrics.

[Go to the Datapoint component](/web/datapoint)`}
        >
          <Box
            maxWidth={960}
            maxHeight={204}
            borderStyle="sm"
            rounding={2}
            padding={6}
            color="light"
            marginBottom={8}
            alignContent="center"
            justifyContent="center"
            smPadding={4}
          >
            <Image
              src="https://github.com/pinterest/gestalt/assets/96082362/c9c06e33-82f7-4112-8f65-514158a4aba5"
              naturalWidth={1800}
              naturalHeight={384}
              alt="Datapoint showing total number of impressions, a positive trend and an info icon."
            />
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Table](/web/table)**
Table is a set of structured data that is easy for a user to scan, examine, and compare. Table data is displayed in a grid format and can be used to structure both interactive and static data.
      `}
        />
      </MainSection>
      <MainSection name="Coming next">
        <MainSection.Subsection
          description={`
          Yes, we are aware that our data visualization components are limited, but we plan to work on the following this year:
          - TagData—for displaying filters as tags and using them to navigate and compare graph data
          - Charts
            - Line
            - Bar
            - Donut
            - Funnel
      `}
        />
      </MainSection>
    </Page>
  );
}
