// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Image, SlimBanner, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Markdown from '../../../docs-components/Markdown.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import desktopgraphExample from '../../../examples/datavisualization/desktopgraphExample.js';
import graphtotableExample from '../../../examples/datavisualization/graphtotableExample.js';
import mobilegraphExample from '../../../examples/datavisualization/mobilegraphExample.js';

export default function ChartsandGraphsPage(): Node {
  return (
    <Page title="Charts and graphs">
      <PageHeader
        name="Chart and graph guidelines"
        type="guidelines"
        description={`Charts and graphs are the most common way that we visualize data on Pinterest. Since all graphs are charts, we just refer to everything as “charts” for simplicity’s sake. Use the following guidelines to create accurate, coherent and responsive charts.
`}
      />
      <MainSection
        name="Chart types"
        description={`
        Currently, we are mainly concerned with looking at categorical data. We do it via the following charts:
        - Bar charts
        - Line charts
        - Funnel charts
        - Donut charts
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
        `}
      />
      <MainSection name="Bar charts" badge={{ text: 'Comparison', tooltipText: 'Chart use case' }}>
        <Box width="100%" marginBottom={12} marginTop={-6}>
          <MainSection.Subsection
            description={`
            A bar chart plots numeric values for categorical data as bars in a graph. The numeric amounts are shown on a common baseline in order to easily compare values across categories. Bar charts are useful for comparing large amounts of data, for example, a wide range of audience categories and interests.
      `}
          />
          <Box
            maxWidth={960}
            maxHeight={480}
            borderStyle="sm"
            overflow="hidden"
            color="light"
            rounding={2}
            marginBottom={3}
          >
            <Image
              alt="An example of a bar chart."
              naturalHeight={900}
              naturalWidth={1800}
              src="https://i.pinimg.com/originals/86/ed/5f/86ed5f5b400366df9006620dd5f9dd0b.png"
            />
          </Box>
          <MainSection.Subsection
            description={`
        Bars are generally arranged vertically in columns. But, when space is an issue, they can be arranged vertically in rows so that it’s easier to scroll. When comparing subsets, of larger categories, bars are grouped with tighter space between them and looser space between groups.`}
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
                  alt="An example of a column chart."
                  naturalHeight={960}
                  naturalWidth={840}
                  src="https://i.pinimg.com/originals/02/af/26/02af26fc1c6cc9835a2a5da1bf85dc35.png"
                />
              </Box>
              <Flex direction="column" gap={2}>
                <Text weight="bold">Column</Text>
                <Text>A column chart for small amounts of data, or larger horizontal spaces</Text>
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
                  alt="An example of a row chart, where bars stack vertically."
                  naturalHeight={960}
                  naturalWidth={840}
                  src="https://i.pinimg.com/originals/79/5f/01/795f011dd16a444f3c5c3959106b211b.png"
                />
              </Box>
              <Flex direction="column" gap={2}>
                <Text weight="bold">Row</Text>
                <Text>A row chart for when you have limited space for labels and bars</Text>
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
                  alt="An example of a grouped or dodged column chart, with bars grouped into smaller categories."
                  naturalHeight={960}
                  naturalWidth={840}
                  src="https://i.pinimg.com/originals/b2/6d/b0/b26db070ed92d77694cba3f49784495c.png"
                />
              </Box>
              <Flex direction="column" gap={2}>
                <Text weight="bold">Grouped</Text>
                <Text>
                  Bars are laid out in groups when representing multi-set data. Here, it is okay to
                  use multiple colors as long as you keep to a max of 4 to increase readability.
                </Text>
              </Flex>
            </Flex.Item>
          </Flex>
        </Box>

        <MainSection
          name="Stacked bar charts"
          badge={{ text: 'Parts-to-whole', tooltipText: 'Chart use case' }}
        >
          <Box width="100%" marginBottom={12} marginTop={-6}>
            <MainSection.Subsection
              description={`
              Stacked bar charts break bars into smaller categories so that their relationship to the whole amount can be seen.
      `}
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
                alt="An example of a stacked bar chart."
                naturalHeight={900}
                naturalWidth={1800}
                src="https://i.pinimg.com/originals/a4/72/d9/a472d91ccc21c805cc7836086377d58e.png"
              />
            </Box>
            <SlimBanner
              type="warningBare"
              iconAccessibilityLabel="Warning"
              message="Use stacked bar charts only with a small number of categories as they can easily become hard to read. Also, keep in mind that the segments of the bar don’t align with a set baseline, so these are mainly for comparing whole amounts."
            />
          </Box>
        </MainSection>
        <MainSection
          name="Line charts"
          badge={{ text: 'Trends; Comparison', tooltipText: 'Chart use case' }}
        >
          <Box width="100%" marginBottom={12} marginTop={-6}>
            <MainSection.Subsection
              description={`
              A line chart plots numeric values for categorical data as a line that shows a progression through time. They can be useful for showing and comparing trends. A common example is showing how ad campaigns perform throughout the year.
      `}
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
                alt="An example of a line chart."
                naturalHeight={900}
                naturalWidth={1800}
                src="https://i.pinimg.com/originals/20/7a/42/207a421240b75b1912c5150369f5fd53.png"
              />
            </Box>
          </Box>
        </MainSection>

        <MainSection
          name="Donut charts"
          badge={{ text: 'Parts-to-whole', tooltipText: 'Chart use case' }}
        >
          <Box width="100%" marginBottom={12} marginTop={-6}>
            <MainSection.Subsection
              description={`
              Donuts are a quick way to see parts of a whole as percentages. An example is breaking up an audience by gender.
      `}
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
                alt="An example of a donut chart."
                naturalHeight={900}
                naturalWidth={1800}
                src="https://i.pinimg.com/originals/9a/fa/7a/9afa7aad0bb7b16264a1afb67eae7a89.png"
              />
            </Box>
            <SlimBanner
              type="warningBare"
              iconAccessibilityLabel="Warning"
              message="Use donuts and pie charts only with 2–3 categories and percentage values as they can easily become hard to read. Donut charts aren’t good for conveying more complex information and allowing you to drill down; a bar chart is better."
            />
          </Box>
        </MainSection>

        <MainSection
          name="Funnel charts"
          badge={{ text: 'Connection', tooltipText: 'Chart use case' }}
        >
          <Box width="100%" marginBottom={12} marginTop={-6}>
            <MainSection.Subsection
              description={`
              Funnel charts visualize data that goes through linear, sequential stages. An example is showing a customer’s journey from visiting a page to adding to their cart to checking out. The diminishing size of the value helps us gauge how much customer drop-off there is throughout the entire journey.
      `}
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
                alt="An example of a funnel chart."
                naturalHeight={900}
                naturalWidth={1800}
                src="https://i.pinimg.com/originals/ba/7a/45/ba7a45f2a622c9b154ee5c7a19033197.png"
              />
            </Box>
          </Box>
        </MainSection>
      </MainSection>
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
     Charts share a number of visual elements like axis lines and labels. Use the guide below to make sure charts are stylistically cohesive across surfaces.
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

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Keep axis lines minimal and light since other more important visual information may be inside of a chart and its surrounding area."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/40/89/63/4089630e25bacb8f268b0cbefc41eeaa.png"
                naturalWidth={1305}
                naturalHeight={1086}
                fit="contain"
                alt="A line chart with graph 5 x-axis graph lines, a dot on one of the graph line points and a tooltip."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Add too many dark axis lines that can make information hard to read or overwhelming."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/4a/a0/5c/4aa05ce803f18d472f8fc4883ab12fe1.png"
                naturalWidth={1305}
                naturalHeight={1086}
                fit="contain"
                alt="A line chart with many dark x and y-axis graph lines plus a tooltip and a dot one of the graph line points."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="do"
            description="Show axis lines only within the area that includes data, so there is a clear start and end."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/9c/d4/fb/9cd4fbb47d4d2e6fdecd0998dd393597.png"
                naturalWidth={1113}
                naturalHeight={894}
                fit="contain"
                alt="A card with graph axis lines that stop before they reach the edge of the card."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Extend axis lines to the edge of the chart container making it seem like there’s a continuation beyond the edges of the container."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/59/d6/75/59d675d5a32fb3a058bded94c1453b15.png"
                naturalWidth={1113}
                naturalHeight={894}
                fit="contain"
                alt="A card with graph axis lines that go all the way to the edge of the card."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection title="Labels"> </MainSection.Subsection>
        <Box width="100%" marginBottom={12}>
          <Box maxWidth={572}>
            <Heading size="300" accessibilityLevel={4}>
              Values and amounts
            </Heading>
            <Markdown
              text={`
              Labels should be placed at key intervals on axis lines.
              - **Desktop and large areas:** Use a maximum of 5 labels
              - **Mobile and small areas (576px and smaller):** Use a maximum of 3 labels horizontally.
            `}
            />
          </Box>
          <Box maxWidth={572}>
            <Heading size="300" accessibilityLevel={4}>
              Categories
            </Heading>
            <Markdown
              text={`
              This will depend on the number of categories you need to compare. But, in general, be mindful of the space provided when comparing categories.
            `}
            />
          </Box>
        </Box>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Keep labels short and only for the main intervals in the graph so that there is enough space between them to easily group data sets."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/43/71/6c/43716c7a1bc73cf4399d5969d11382be.png"
                naturalWidth={1305}
                naturalHeight={1086}
                fit="contain"
                alt="A graph with five short y-axis labels and 3 short x-axis labels."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Add too many labels or rotate the orientation of the labels so that they fit. In these cases, consider using a table, or starting with a small overview graph that opens to a larger, more granular view."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/40/03/28/400328d9af6cd8ea9473fba96fc1c7ba.png"
                naturalWidth={1305}
                naturalHeight={1086}
                fit="contain"
                alt="A graph with too many labels scrunched together and labels that are diagonal."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>

        <Box width="100%" marginBottom={8}>
          <MainSection.Subsection
            title="Legend"
            description="The default placement for legends is directly underneath the chart. Start-align legends for rectangular charts like bar, line and funnel; center-align legends below a donut."
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
              alt="A line chart with a legend in the bottom left corner."
              naturalHeight={900}
              naturalWidth={1800}
              src="https://i.pinimg.com/originals/9a/e7/b9/9ae7b9e80af152356e91ed2a49efae03.png"
            />
          </Box>
        </Box>
        <MainSection.Subsection description="Symbols representing categories should look like the type of visualization that’s in the chart. For example, use short lines to depict a line chart and boxes to represent a bar chart." />
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          overflow="hidden"
          color="light"
          rounding={2}
          marginBottom={12}
          marginTop={2}
        >
          <Image
            alt="A line chart with a legend in the bottom left corner."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/c8/0f/a1/c80fa1d320d691dc8b5ae10997d6c5ee.png"
          />
        </Box>
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
          <Box maxWidth={572}>
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
          <Box maxWidth={572} marginTop={10}>
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
          <Box maxWidth={572}>
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
        <Box width="100%" marginBottom={2}>
          <MainSection.Subsection
            title="Desktop web"
            description="The most important data should be read at a glance, with additional information surfaced via mouse hovers or via keyboard navigation. There shouldn’t be a lag when interacting; tooltips should appear as soon as the mouse cursor enters an area where more information is needed. For example, on a single line chart it should happen as soon as the mouse enters the area between both axis. On a bar chart, multi-line chart or donut chart, when someone hovers over a segment of the bar, line or donut."
          />
          <Flex maxWidth={800} flex="grow">
            <Flex.Item flex="grow">
              <SandpackExample
                code={desktopgraphExample}
                name="Desktop Chart Interaction Example"
                hideEditor
                hideControls
                previewHeight={500}
              />
            </Flex.Item>
          </Flex>
        </Box>

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
                previewHeight={500}
              />
            </Flex.Item>
          </Flex>
        </Box>
      </MainSection>
      <MainSection
        name="Accessibility"
        description="Data visualizations are a very powerful way to interpret and analyze data, but they aren’t for everyone. Keep the following best practices in mind when creating charts and other visualizations."
      >
        <Box width="100%" marginBottom={4}>
          <MainSection.Subsection
            title="Provide a tabular alternate"
            description="Some people may find it hard to process complex visual information due to either visual or cognitive impairments. Motor impairments may also make it difficult to navigate a chart, and some charting libraries may not have robust keyboard controls. Therefore, it’s good to allow people to also view chart data as a text-only table. Open the table in a modal or another page if the data can’t fit in the space that the chart is currently in."
          />
          <Flex maxWidth={800} flex="grow">
            <Flex.Item flex="grow">
              <SandpackExample
                code={graphtotableExample}
                name="Chart to Table Example"
                hideEditor
                hideControls
                previewHeight={500}
              />
            </Flex.Item>
          </Flex>
        </Box>
        <MainSection.Subsection
          title="Use accessible color combinations"
          description="[Our color palette](color/palette) is optimized for current AA color guidelines for graphics, with a 3:1 contrast ratio between visuals and a light background. We also recommend sticking to our standard [color combinations](color/usage#Color-pairings) so that people that are colorblind can also read charts."
        />
      </MainSection>
      <Box width="100%" marginBottom={4} marginTop={-8}>
        <MainSection.Subsection
          title="Provide accessible settings and modes"
          description="Charts can be adjusted to help people with vision impairments by using shapes and patterns in addition to color."
        />
        <Flex gap={6} alignContent="between" wrap direction="row">
          <Flex.Item flex="grow" flexBasis="0%" minWidth={280} maxWidth="100%">
            <Box
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              padding={8}
              justifyContent="center"
              alignContent="center"
            >
              <Image
                alt="An example of a multi-line chart different shapes on each line end-point."
                naturalHeight={894}
                naturalWidth={1113}
                src="https://i.pinimg.com/originals/7b/f9/10/7bf91071db02e00279da5cdec52988e6.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Shapes</Text>
              <Text>
                Shapes can be used on line graphs to help people with severe colorblindness or other
                visual impairments tell categories apart.
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
              padding={4}
              justifyContent="center"
              alignContent="center"
            >
              <Image
                alt="A bar chart with different patterns on each bar to better distinguish between chategories."
                naturalHeight={894}
                naturalWidth={1113}
                src="https://i.pinimg.com/originals/54/e3/db/54e3dbd7937613469f95f700206f3c4c.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Patterns</Text>
              <Text>Patterns can be used in addition to color to help better tell bars apart.</Text>
            </Flex>
          </Flex.Item>
        </Flex>
        <Box width="100%" marginBottom={4} marginTop={8}>
          <MainSection.Subsection description="However, keep in mind that charts are not viewed in isolation, but are often part of a page with other dense content on it that is read in a distracting environment—other windows and browser tabs can be open, and the office may be noisy. This can lead to cognitive overload and then make it harder for people with other impairments to interpret the data." />
          <Box maxWidth={960} maxHeight={596} overflow="hidden" marginBottom={3} marginTop={4}>
            <Image
              alt="A desktop screen with a multi-line graph with shapes plus a lot of other visual distractions like UI elements, browser elements and desktop operating system controls."
              naturalHeight={1263}
              naturalWidth={2034}
              src="https://i.pinimg.com/originals/63/a3/67/63a367a3f627a60c5c92c3d9a38d29c2.png"
            />
          </Box>
          <MainSection.Subsection description="If you add shapes, patterns or high-contrast colors to help with accessibility, be sure to allow people to turn those on and off as needed." />
        </Box>
      </Box>
      <MainSection
        name="Coming updates"
        description="We plan to add chart components in the near future. In the component documentation we will go further into chart-specific guidelines, properties and variants. Stay tuned!"
      />
    </Page>
  );
}
