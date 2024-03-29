// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Image } from 'gestalt';
import MainSection from '../../../../docs-components/MainSection';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function BarGraphsPage(): ReactNode {
  return (
    <Page title="Bar graphs">
      <PageHeader
        badge="comparison"
        description={`Bar graphs plot numeric values for categorical data as bars on an x/y axis. The numeric amounts are shown on a common baseline in order to easily compare values across categories. If you need to plot and/or compare data across a time range, use a [Line graph](/foundations/data_visualization/charts_and_graphs/line_graphs) instead.
`}
        name="Bar graphs"
        type="guidelines"
      />
      <Box
        borderStyle="sm"
        color="light"
        marginBottom={3}
        maxHeight={300}
        maxWidth={892}
        overflow="hidden"
        rounding={2}
      >
        <Image
          alt="An example of a bar chart."
          naturalHeight={2676}
          naturalWidth={900}
          src="https://i.pinimg.com/originals/e6/de/0f/e6de0f773e8b0d013f236130745bcf4a.png"
        />
      </Box>
      <MainSection
        description={`
For components, go to:
- Web component: [ChartGraph](/web/chartgraph)
- Figma component: [Column bar graph](http://pinch.pinadmin.com/figma-bar-column)
- Figma component: [Horizontal bar graph](http://pinch.pinadmin.com/figma-bar-horizonal)
    `}
        name="Components"
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - When comparing categorical data sets based on total amount and size
            - When a side-by-side visual representation is needed to compare sizes
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - When viewing or comparing data and/or trends that change in value over time. Use a [line graph](/foundations/data_visualization/charts_and_graphs/line_graphs) instead.
            - When it’s more important to see how different amounts of categorical data form a whole. Use a pie or [donut chart](/foundations/data_visualization/charts_and_graphs/donut_charts) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description="These are best practices specific to bar graphs. For global best practices, see [ChartGraph best practices](/web/chartgraph#Best-practices) and [General guidelines](/foundations/data_visualization/charts_and_graphs/general_guidelines)."
        name="Best practices"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card description="Use to compare total values between categories." type="do">
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A bar graph comparing Spend and impressions by Gender. The categories are 'man', 'woman' and 'unspecified'."
                fit="contain"
                naturalHeight={894}
                naturalWidth={1116}
                src="https://i.pinimg.com/originals/c2/d6/b3/c2d6b3cfd1f1c27dbd2006a968be3cdc.png"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            description="Use to show the progress of values over time. Use a line graph instead."
            type="don't"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A bar graph used to show total spend for the summer of 2023."
                fit="contain"
                naturalHeight={894}
                naturalWidth={1116}
                src="https://i.pinimg.com/originals/1c/93/1f/1c931fdcf4f503f9c3d3701720785740.png"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description="Use to compare sizes from a common zero baseline to maintain accuracy."
            type="do"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A bar graph comparing CPM and total spend for 3 types of bike ads. Both y-axis start at 0."
                fit="contain"
                naturalHeight={894}
                naturalWidth={1116}
                src="https://i.pinimg.com/originals/3c/da/e2/3cdae2a47759322c3d7970c642ca1a83.png"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            description="Start from a non-zero baseline, as that can distort the ratios between the amounts being compared."
            type="don't"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A bar graph comparing CPM and total spend for 3 types of bike ads. The CPM axis starts at $0, but the Total spend axis starts at $10k."
                fit="contain"
                naturalHeight={894}
                naturalWidth={1116}
                src="https://i.pinimg.com/originals/a0/a7/2a/a0a72a66011a97b1cb8c6392778d9c3f.png"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description="Use additional colors only when comparing categorical data that sits inside of a larger dimension also being compared. Keep it to 4 colors maximum, otherwise charts will get hard to read."
            type="do"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A bar graph comparing iOS, Android, Mac and Windows usage by age. Each device-type has a color."
                fit="contain"
                naturalHeight={894}
                naturalWidth={1116}
                src="https://i.pinimg.com/originals/0b/6b/f2/0b6bf214826f23c62704397c9b124aaa.png"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            description="Use multiple colors to compare only one large category with no sub-categories. Use a single color in those cases as the main focus is comparing amounts."
            type="don't"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A bar graph comparing impressions by age with each age group having a different color."
                fit="contain"
                naturalHeight={894}
                naturalWidth={1116}
                src="https://i.pinimg.com/originals/53/0a/c1/530ac1599158e6fc5d12bdab33040800.png"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description={`See the ChartGraph component for use cases and examples of all the different types of bar graphs available:
- [Bar horizontal](/web/chartgraph#Bar-horizontal)
- [Bar column](/web/chartgraph#Bar-column)
- [Stacked bars](/web/chartgraph#Stacked-bars)
`}
        name="Variants"
      />

      <MainSection
        description="For general writing and content formatting guidelines, refer to our [Content standards](/foundations/content_standards/ui_elements)."
        name="Writing"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - Keep labels short so that they don’t wrap and make it hard to read data
            -  Use abbreviations that are commonly understood and can be translated to all supported languages
        `}
            title="Do"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - Create extra-long labels that have to wrap or truncate
            - Use abbreviations that are only understood internally or that don't translate well.
        `}
            title="Don't"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
