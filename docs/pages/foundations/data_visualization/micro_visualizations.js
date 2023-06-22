// @flow strict
import { type Node } from 'react';
import { Box, Image } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function GuidelinesPage(): Node {
  return (
    <Page title="Micro-visualiations">
      <PageHeader
        name="Micro-visualizations"
        type="guidelines"
        description={`Micro-visualizations are small-scale visualizations that support larger sets of data. They can appear in tables, cards, popovers, and other small spaces, to provide a quick graphic representation of data that supports text content.
`}
      />
      <MainSection name="Use cases">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
            - When adding charts to small spaces such as tables to support the accompanying information
            - When displaying data that can be easily understood at a glance without supporting numbers and text to help users make quick decisions
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
            - When the user needs an immersive and detailed experience to understand the data. Use one of the regular chart typesregular chart types instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="General guidelines">
        <MainSection.Subsection
          title="Interactions"
          description="Make the micro-visualization interactive by either displaying a tooltip on hover or opening a new page with a detailed, full-size chart. That way, the user can explore the data in more detail if needed."
        />
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={11}
        >
          <Image
            alt="A pointer hovering over a mini-bar and a tooltip showing next to the bar."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/75/0a/54/750a54f9dcc5a0dda0ae440466692295.png"
          />
        </Box>

        <MainSection.Subsection
          title="Displaying data"
          description="If possible, annotate key points on the mini-chart to describe the data and make it understandable. Micro-visualizations should have a simplified design but still convey meaning at a glance."
        />
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={11}
        >
          <Image
            alt="A series of data points with sparklines."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/10/1b/77/101b777e16d7495630122dcf87979d2f.png"
          />
        </Box>
        <MainSection.Subsection
          title="Placement"
          description="Micro-visualizations should be used in limited spaces, such as tables, dashboards, or modules."
        />
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={11}
        >
          <Image
            alt="Sparklines inside of a table."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/5e/7a/b2/5e7ab2040f618efeda672ad498ab37ce.png"
          />
        </Box>
      </MainSection>
      <MainSection
        name="Datapoints"
        description={`
        Datapoints show at-a-glance data for users to quickly understand key metrics. They display a single numerical metric and are accompanied by a trend icon to give users context about the data displayed. Datapoints can be paired with sparklines for extra visual context.
        `}
      >
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={8}
        >
          <Image
            alt="A series of Datapoints."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/07/77/aa/0777aafa727393f356f0c725a629fbba.png"
          />
        </Box>
      </MainSection>
      <MainSection
        name="Mini-bars"
        description={`
        A mini-bar chart serves the same function as a regular bar chart [link to bar charts], but mini-bars can be used within tables, cards, and other small spaces to reinforce the understanding of numerical values when comparing large amounts of data. Due to their compact form, mini-bars are usually placed in rows for easy vertical scanning.

        Mini-bars can also be displayed stacked to show percentages, like for example, a visualization of how many items there are in stock.
        `}
      >
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={8}
        >
          <Image
            alt="An example of mini-bars to complement table data."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/dd/dc/67/dddc67e2ded9f29946646350c64a8110.png"
          />
        </Box>
      </MainSection>
      <MainSection
        name="Mini-donuts"
        description={`
        Mini-donuts can help users see parts of a whole as percentages. They are best used when there are 2 to 3 segments to represent since they can get small and be hard to read, especially in a reduced version. If there are more segments to represent, opt for a group of mini-bars.
        `}
      >
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={8}
        >
          <Image
            alt="An example of mini-donuts to complement items in a table."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/da/2f/6b/da2f6b27668a3978ef8855a81ad43419.png"
          />
        </Box>
      </MainSection>
      <MainSection
        name="Sparklines"
        description={`
        Sparklines are small and simplified line or area charts that show the general trend over time. They can be included in display metrics, tables, spreadsheets and graphics. By placing sparklines in a relevant context, they give single numbers meaning.

        Regarding scale, there isn’t an aspect ratio where “one size fits all”. Sparklines should be moderately greater in width than in height, to avoid a spiky or flat profile, which can lead to incorrect data interpretation. When shown together, they should adopt the same range if they’re being used for trend comparison purposes.
        `}
      >
        <Box
          maxWidth={960}
          maxHeight={480}
          borderStyle="sm"
          rounding={2}
          padding={6}
          color="light"
          marginBottom={8}
        >
          <Image
            alt="Several sparklines inside of table rows."
            naturalHeight={900}
            naturalWidth={1800}
            src="https://i.pinimg.com/originals/62/66/a5/6266a5ed0b6c9820715b122b8543feee.png"
          />
        </Box>
      </MainSection>
      <MainSection
        name="Resources"
        description={`
         - [Micro-Visualizations: Small Visualizations That Make a Big Impact](https://www.designforcontext.com/insights/micro-visualizations-small-visualizations-make-big-impact)
         - [Micro Visualization](https://www.vis.uni-stuttgart.de/en/research/visual_analytics/mikrovisualisierung/#:~:text=Micro%20visualization%20includes%20various%20subtopics,are%20usually%20integrated%20into%20texts.)
         - [Mircoviz.info](https://microvis.info/)
         - [Edward Tufte: Sparklines](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR)
         - [Best practices for scaling sparklines](https://www.perceptualedge.com/articles/visual_business_intelligence/best_practices_for_scaling_sparklines.pdf)
        `}
      />
    </Page>
  );
}
