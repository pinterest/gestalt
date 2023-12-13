// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Image } from 'gestalt';
import MainSection from '../../../../docs-components/MainSection';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function LineGraphsPage(): ReactNode {
  return (
    <Page title="Line graphs">
      <PageHeader
        name="Line graphs"
        type="guidelines"
        badge="trends"
        description={`Line graphs plot numeric values for categorical data as a line that shows a progression through time. If you need to plot and/or compare data by amount from a common zero-line, use a [Bar graph](/foundations/data_visualization/charts_and_graphs/bar_graphs)
`}
      />
      <Box
        maxWidth={892}
        maxHeight={300}
        borderStyle="sm"
        overflow="hidden"
        color="light"
        rounding={2}
        marginBottom={3}
      >
        <Image
          alt="An example of a line graph."
          naturalHeight={2676}
          naturalWidth={900}
          src="https://github.com/pinterest/gestalt/assets/96082362/b719c24e-a036-420e-8e0b-87d75d698565"
        />
      </Box>
      <MainSection
        name="Components"
        description={`
For components, go to:
- Web component: [ChartGraph](/web/chartgraph)
- Figma component: [Line graph](http://pinch.pinadmin.com/figma-line-graph)
    `}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
            - When viewing or comparing data that changes over a certain time range
            - When a visual representation is needed to see trends and understand data
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
            - When viewing or comparing categories based on total amounts. Use a [bar graph](/foundations/data_visualization/charts_and_graphs/bar_graphs) instead.
            - When it’s more important to see how different amounts of categorical data form a whole. Use a Pie or [Donut](/foundations/data_visualization/charts_and_graphs/donut_charts) chart instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Best practices"
        description="These are best practices specific to line graphs. For global best practices, see [ChartGraph best practices](/web/chartgraph#Best-practices) and [General guidelines](/foundations/data_visualization/charts_and_graphs/general_guidelines)."
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use to analyze and/or compare values as they progress through time."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/94/2e/ff/942effa155bf91b3a5b809eb13cb8bf9.png"
                naturalWidth={1116}
                naturalHeight={894}
                fit="contain"
                alt="A line graph comparing number of impressions in the Northwest and Southwest regions from the months of June through October."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Use to compare total amounts between categories. Use a bar graph instead."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/51/d1/ca/51d1cae278be929737ccfd7e3461c117.png"
                naturalWidth={1116}
                naturalHeight={894}
                fit="contain"
                alt="A line graph comparing number of impressions by region. The x-axis is used to show the trend by age group instead of through time."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Keep it to a maximum of 4 colors in a single line for easier readability."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/6a/e7/c8/6ae7c8f9848caf9e67b599b0ecd4f2d7.png"
                naturalWidth={1116}
                naturalHeight={894}
                fit="contain"
                alt="A line graph comparing spend by 4 product groups: bags, jeans, shoes and tops."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Use 5 or more colors to compare data sets, as it can quickly become hard to read. Place single-line graphs in a grid instead."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/b0/b2/1e/b0b21e70b03b0685d5ea75f4f9a57800.png"
                naturalWidth={1116}
                naturalHeight={894}
                fit="contain"
                alt="A crowded  line graph comparing spend by 7 product groups: bags, coats, hats, jeans, shoes, slacks and tops."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use line shapes that are true to the accuracy of the data presented—sharp ends for absolute data, curved lines for approximate historical data and dashed + curved lines for forecasts."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/bd/3d/51/bd3d51e3ac16d5dbf0d4dbbbfdb9bb1c.png"
                naturalWidth={1116}
                naturalHeight={894}
                fit="contain"
                alt="A line graph showing a solid, rectilinear line for actual revenue and a curved dashed line for predicted revenue."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Use curved lines for visual appeal; they can make it hard to tell what the accuracy of the data is."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/44/cd/06/44cd06a77b731963bcdf94db6b269485.png"
                naturalWidth={1116}
                naturalHeight={894}
                fit="contain"
                alt="A line graph using a curved solid line for historical, accurate revenue data."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Variants"
        description={`See the ChartGraph component for use cases and examples of all the different types of line graphs available:
- [Line graph](/web/chartgraph#Line): for both single or multiple lines
- [Biaxial](/web/chartgraph#Biaxial): when comparing two trends that have significantly different amounts or units of measurement
- [Precision in line graphs](/web/chartgraph#Precision-in-line-graphs): for deciding when to use a rectilinear, curved or dashed line
`}
      />

      <MainSection
        name="Writing"
        description="For general writing and content formatting guidelines, refer to our [Content standards](/foundations/content_standards/ui_elements)."
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="Do"
            description={`
            - Keep labels short so that they don’t wrap and make it hard to read data
            - Use abbreviations that are commonly understood and can be translated to all supported languages
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="Don't"
            description={`
            - Create extra-long labels that have to wrap or truncate
            - Use abbreviations that are only understood internally or that don't translate well.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
