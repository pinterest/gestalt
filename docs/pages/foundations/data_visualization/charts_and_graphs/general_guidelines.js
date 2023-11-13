// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, Image, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../../docs-components/consts.js';
import MainSection from '../../../../docs-components/MainSection.js';
import Markdown from '../../../../docs-components/Markdown.js';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';
import SandpackExample from '../../../../docs-components/SandpackExample.js';
import mobilegraphExample from '../../../../examples/datavisualization/mobilegraphExample.js';

export default function GeneralGuidelines(): ReactNode {
  return (
    <Page title="General guidelines">
      <PageHeader
        name="General guidelines"
        type="guidelines"
        description={`Charts and graphs are the most common way that we visualize data on Pinterest. Since all graphs are charts, we just refer to everything as “charts” for simplicity’s sake. Use the following guidelines to create accurate, coherent and responsive charts.
`}
      />
      <MainSection
        name="Chart use cases"
        description={`
The type of chart you use depends on how you are analyzing and monitoring data. Below are our most common use cases:

  - **Trends:** to see how data changes over time
  - **Parts-to-whole:** to see how a breakdown adds up to a total
  - **Comparison:** to see how multiple data sets compare to each other
  - **Connection:** to see the relationship between variables

For a great resource on understanding when to use what type of chart, [download the Financial Times Visual Vocabulary PDF](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/FT4schools_RGS.pdf).
        `}
      />

      <MainSection
        name="Chart types"
        description={`
        Currently, we are mainly concerned with looking at categorical data. We do it via the following charts:
        - [Bar graphs](/foundations/data_visualization/charts_and_graphs/bar_graphs) for Comparison
        - [Line graphs](/foundations/data_visualization/charts_and_graphs/line_graphs) for Trends
        - [Combo graphs](/foundations/data_visualization/charts_and_graphs/combo_graphs) for Trends + Comparison
        - [Donut charts](/foundations/data_visualization/charts_and_graphs/donut_charts) for Parts-to-whole
        - [Funnel charts](/foundations/data_visualization/charts_and_graphs/funnel_charts) for Connection
        `}
      />

      <MainSection name="Additional charts">
        <MainSection.Subsection
          description={`
        Though not currently supported, you can find information on additional charts and visualizations here:
        - [The Data Viz Project](https://datavizproject.com/)
        - [Data Visualization Catalogue](https://datavizcatalogue.com/index.html)`}
        />
      </MainSection>

      <MainSection
        name="Visual elements"
        description={`
     Charts share a number of visual elements like axis lines and labels. Use the guide below to make sure charts are stylistically cohesive across surfaces. For styles specific to a particular chart, see the chart's guideline."
     `}
      >
        <Box width="100%" marginBottom={12}>
          <MainSection.Subsection
            title="Axis lines"
            description="Axis lines should help a person follow the flow of the data and anchor them to the primary increments that are important to pay attention to."
          />
          <Box
            maxWidth={960}
            maxHeight={480}
            borderStyle="sm"
            overflow="hidden"
            color="light"
            rounding={2}
            marginBottom={3}
            marginTop={2}
          >
            <Image
              alt="A line chart with only x-axis lines, a row bar chart with y-axis lines and one x-axis line and funnel chart with only y-axis lines."
              naturalHeight={900}
              naturalWidth={2796}
              src="https://i.pinimg.com/originals/9f/f0/b6/9ff0b654625fbcd8edf99413e7ca3fe5.png"
            />
          </Box>
        </Box>
        <MainSection.Subsection description="All linear charts are anchored to a clear baseline starting point to show either categories or time ranges, with another clear baseline to show values. In line and bar charts, additional grid lines are shown that follow the flow of information—horizontal for line charts and vertical for row bar charts. Though funnel chart info is read horizontally, axis lines are arranged vertically to more clearly show where one process ends and the next begins." />

        <MainSection.Subsection
          title="Shape"
          description="Shapes in all graphs should be flat, 2D and minimally styled so that they are as accurate as possible."
        />
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Keep corners closer to a rectangular shape so that the accuracy of the data is clear."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/6c/79/c0/6c79c0c7119388d96a837ecf7e3c1963.png"
                naturalWidth={1305}
                naturalHeight={1086}
                fit="contain"
                alt="Bar and donut charts with square corners and ends."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Overly round corners so that it’s hard to tell where the true start and end is of a category or amount."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/33/26/76/33267646f80755a7bb72df87a779ab04.png"
                naturalWidth={1305}
                naturalHeight={1086}
                fit="contain"
                alt="A bar chart and a donut chart with fully rounded corners and ends."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <Box width="100%" marginBottom={12}>
          <MainSection.Subsection
            title="Patterns"
            description="Use consistent pattern language on lines and bars to avoid ambiguity."
          />
          <Box
            maxWidth={960}
            maxHeight={480}
            borderStyle="sm"
            overflow="hidden"
            color="light"
            rounding={2}
            marginBottom={3}
            marginTop={2}
          >
            <Image
              alt="A dashed line for forecasted data. A solid line means for historical data, a diagonal pattern for unavailable data and a pulsating dot for real-time data."
              naturalHeight={900}
              naturalWidth={1800}
              src="https://i.pinimg.com/originals/54/84/12/548412ce8df3dc0357c30bff2dbc7d89.png"
            />
          </Box>
        </Box>

        <Box width="100%" marginBottom={12}>
          <MainSection.Subsection
            title="Layout"
            description="Follow the hierarchy and spacing below when adding headings, text and other UI elements to a chart."
          />
          <Box
            maxWidth={960}
            maxHeight={480}
            borderStyle="sm"
            overflow="hidden"
            color="light"
            rounding={2}
            marginBottom={3}
            marginTop={2}
          >
            <Image
              alt="A spacing spec that shows how to use 24px spacing between Headings, Datapoints and a line chart, with 16px between a line chart and its legend."
              naturalHeight={1494}
              naturalWidth={3024}
              src="https://i.pinimg.com/originals/49/89/b4/4989b46ec8b659dcb3eab22034796d0e.png"
            />
          </Box>
        </Box>

        <Box width="100%" marginBottom={12}>
          <MainSection.Subsection
            title="Order"
            description="The order of categories and values in a chart should be inherent. If there is no clear order, place categories from the largest to the smallest amounts. If multiple data sets are being compared, stick to the same order for all data sets. For example, if an advertiser is comparing the types of devices used for one ad campaign, then opens another ad campaign to compare, use the same order."
          />

          <Flex gap={6} alignContent="between" wrap direction="row">
            <Flex.Item flex="grow" flexBasis="0%" minWidth={280} maxWidth="100%">
              <Box
                overflow="hidden"
                color="light"
                rounding={2}
                borderStyle="sm"
                marginBottom={3}
                justifyContent="center"
              >
                <Image
                  alt="Bars in a chart in reverse chronological order."
                  naturalHeight={600}
                  naturalWidth={750}
                  src="https://i.pinimg.com/originals/c5/3c/aa/c53caa945d112dc8ee78b969eea23865.png"
                />
              </Box>
              <Flex direction="column" gap={2}>
                <Text>Data is organized by centuries in reverse chronological order.</Text>
              </Flex>
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis="0%" minWidth={280} maxWidth="100%">
              <Box
                overflow="hidden"
                color="light"
                rounding={2}
                borderStyle="sm"
                marginBottom={3}
                justifyContent="center"
              >
                <Image
                  alt="Bars in a chart ordered from largest to smallest"
                  naturalHeight={600}
                  naturalWidth={750}
                  src="https://i.pinimg.com/originals/d8/d6/32/d8d632517d398a05202e6f419a80e588.png"
                />
              </Box>
              <Flex direction="column" gap={2}>
                <Text>
                  Data is ordered from largest to smallest amount when the order isn’t inherent.
                </Text>
              </Flex>
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis="0%" minWidth={280} maxWidth="100%">
              <Box
                overflow="hidden"
                color="light"
                rounding={2}
                borderStyle="sm"
                marginBottom={3}
                justifyContent="center"
              >
                <Image
                  alt="A donut chart ordered from largest to smallest going clockwise."
                  naturalHeight={600}
                  naturalWidth={750}
                  src="https://i.pinimg.com/originals/ba/d4/e6/bad4e68c94518c21130f435c8e73c06e.png"
                />
              </Box>
              <Flex direction="column" gap={2}>
                <Text>
                  In a donut chart, data is ordered from largest to smallest going clockwise.
                </Text>
              </Flex>
            </Flex.Item>
          </Flex>
        </Box>
        <MainSection.Subsection title="Empty states"> </MainSection.Subsection>
        <Box width="100%" marginBottom={12}>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Heading size="300" accessibilityLevel={4}>
              No data available
            </Heading>
            <Markdown
              text={`
              When there is no data to show, use an illustration, coupled with descriptive text.
            `}
            />
          </Box>
          <Box
            maxWidth={960}
            maxHeight={480}
            borderStyle="sm"
            overflow="hidden"
            color="light"
            rounding={2}
            marginBottom={3}
            marginTop={6}
          >
            <Image
              alt="An illustration of an empty spool of thread with the message, 'No data available'."
              naturalHeight={1494}
              naturalWidth={3024}
              src="https://i.pinimg.com/originals/4c/ce/f8/4ccef8004054d120fe4b738df8cdbd2d.png"
            />
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10}>
            <Heading size="300" accessibilityLevel={4}>
              User input needed
            </Heading>
            <Markdown
              text={`
              When there is data to show because a user needs to interact first, show the graph axis lines and be sure to announce that interaction is required in order to display data.
            `}
            />
          </Box>
          <Box maxWidth={960} maxHeight={596} overflow="hidden" marginBottom={3} marginTop={6}>
            <Image
              alt="A desktop web screen prompting a user to select a metric in order to see data. The graph area just shows the x and y-axis lines, but no data line."
              naturalHeight={1263}
              naturalWidth={2034}
              src="https://i.pinimg.com/originals/31/6e/72/316e7218de085dc5410330c522d41f4a.png"
            />
          </Box>
        </Box>
        <MainSection.Subsection title="Full error states"> </MainSection.Subsection>
        <Box width="100%" marginBottom={12}>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Heading size="300" accessibilityLevel={4}>
              No data available
            </Heading>
            <Markdown
              text={`
              When all of the data in a chart can’t be loaded, use an illustration coupled with an error status icon and descriptive text. Include a way to reload the data. Inline errors vary by the type of chart.
            `}
            />
          </Box>
          <Box
            maxWidth={960}
            maxHeight={480}
            borderStyle="sm"
            overflow="hidden"
            color="light"
            rounding={2}
            marginBottom={3}
            marginTop={6}
          >
            <Image
              alt="An illustration of a sad coffee cup with a small error icon next to the text 'Data didn't load' and a prompt to retry loading data."
              naturalHeight={1494}
              naturalWidth={3024}
              src="https://i.pinimg.com/originals/df/8d/64/df8d6441d9cfb87bb8aeddad9b33692a.png"
            />
          </Box>
        </Box>
      </MainSection>

      <MainSection name="Interactions">
        <MainSection.Subsection
          title="Desktop web"
          description="The most important data should be read at a glance, with additional information surfaced via mouse hovers or via keyboard navigation. There shouldn’t be a lag when interacting; tooltips should appear as soon as the mouse cursor enters an area where more information is needed. For example interactions, see [ChartGraph Tooltip](../../../web/chartgraph#Tooltip)."
        />

        <Box width="100%" marginBottom={0}>
          <MainSection.Subsection
            title="Mobile and touch"
            description="For touch interfaces, additional information is shown when pressing and holding down in the graph area. Since fingers can often obstruct information, tooltips on mobile are always shown at the very top of the chart, and don’t move around like they do on desktop surfaces."
          />
          <Flex maxWidth={800} flex="grow">
            <Flex.Item flex="grow">
              <SandpackExample
                code={mobilegraphExample}
                name="Mobile Chart Interaction Example"
                hideEditor
                hideControls
                previewHeight={516}
              />
            </Flex.Item>
          </Flex>
        </Box>
      </MainSection>

      <MainSection
        name="Accessibility"
        description="Data visualizations are a very powerful way to interpret and analyze data, but they aren’t for everyone. Keep the following best practices in mind when creating charts and other visualizations."
      >
        <MainSection.Subsection
          title="A note on using patterns and shapes"
          description="Keep in mind that charts are not viewed in isolation, but are often part of a page with other dense content on it that is read in a distracting environment—other windows and browser tabs can be open, and the office may be noisy. This can lead to cognitive overload and then make it harder for people with other impairments to interpret the data."
        />
        <Box maxWidth={960} maxHeight={596} overflow="hidden" marginBottom={3} marginTop={4}>
          <Image
            alt="A desktop screen with a multi-line graph with shapes plus a lot of other visual distractions like UI elements, browser elements and desktop operating system controls."
            naturalHeight={1263}
            naturalWidth={2034}
            src="https://i.pinimg.com/originals/63/a3/67/63a367a3f627a60c5c92c3d9a38d29c2.png"
          />
        </Box>
        <MainSection.Subsection description="If you add shapes, patterns or high-contrast colors to help with accessibility, be sure to allow people to turn those on and off as needed." />
      </MainSection>
    </Page>
  );
}
