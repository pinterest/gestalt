// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box, Image } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function GuidelinesPage(): ReactNode {
  return (
    <Page title="Overview">
      <PageHeader
        description={`Data visualization refers to the graphical representation of data. In Pinterest products, data is generally visualized in charts via symbols like lines and bars. However, visual representations of data can also appear as sparklines, mini-bars and mini-donuts inside table cells, cards and other UI elements.
`}
        name="Overview"
        type="guidelines"
      />
      <MainSection name="Principles">
        <MainSection.Subsection
          description={`
          Although aesthetics are important, data visualizations should be primarily accurate. Any visual treatments should reinforce the accuracy and veracity of data so that people can take the correct action.
`}
          title="Accurate"
        />
        <MainSection.Subsection
          description={`
          Data should be visualized in a way that is readable, digestible and actionable depending on a person’s role and situation. For example, a busy campaign manager should be able to quickly read data in order to understand how a campaign is doing. A data scientist should be able to go into deeper, more complex visualizations and do the same.
`}
          title="Purposeful"
        />
        <MainSection.Subsection
          description={`
          Data visualizations should be accurate and coherent on desktop and mobile screens. Even on desktop, a data set should respond to large, medium and small views.`}
          title="Responsive"
        />
      </MainSection>

      <MainSection name="Use cases">
        <MainSection.Subsection
          description={`While data visualization can be an effective way for people to analyze, interpret and act on data, it isn’t always the best way to represent data in UIs.
        `}
        />
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - When comparing, explaining or monitoring data can be done faster by using a graphical representation
            - For people who can process data visually
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
             - If data can be more simply stated by using text
             - For people who may have cognitive or other impairments that make it hard to process graphical representations of data. Use tabular data instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
        <Box marginBottom={8} marginTop={-8} width="100%">
          <MainSection.Subsection
            description="Data visualizations can be used to help someone explore, review and analyze various data sets to get a general understanding of how things are going. An example is an advertising insights dashboard with a chart and micro-visualizations that tell an overall story."
            title="To analyze"
          />
          <Box maxHeight={579} maxWidth={960}>
            <Image
              alt="Desktop screen showing a line graph used to analyze metrics."
              naturalHeight={1263}
              naturalWidth={2034}
              src="https://i.pinimg.com/originals/bb/4e/df/bb4edfc12e5a2e9ccba1627fc43de21c.png"
            />
          </Box>
        </Box>

        <Box marginBottom={8} marginTop={12} width="100%">
          <MainSection.Subsection
            description="Administrators may use data visualizations to monitor the health of a system and check for errors, budget usage or other issues."
            title="To monitor"
          />
          <Box maxHeight={579} maxWidth={960}>
            <Image
              alt="Desktop screen showing a dashboard with various line graphs that show warning, error states."
              naturalHeight={1263}
              naturalWidth={2034}
              src="https://i.pinimg.com/originals/47/65/2e/47652ebc0d0f754fee793c98a4e2f03c.png"
            />
          </Box>
          <Box marginBottom={8} marginTop={4} width="100%">
            <MainSection.Subsection
              description="Similarly, an Advertiser or Creator may use a mobile app to monitor ads and content on
              the go."
            />
            <Box marginTop={2} maxHeight={780} maxWidth={375}>
              <Image
                alt="A mobile screen with align graph showing how ad impressions are going."
                naturalHeight={2229}
                naturalWidth={1212}
                src="https://i.pinimg.com/originals/8f/88/ae/8f88ae83668e083d600f223f25e384c8.png"
              />
            </Box>
          </Box>
        </Box>
        <BannerSlim
          iconAccessibilityLabel="Information"
          message="Data visualization can also be used to explain, but this is generally done via custom, hand-curated reports that aren’t automated. This isn’t part of our product UI or design system, but data visualizations in our products can help people create custom reports for presentations, blog posts and reports."
          type="info"
        />
      </MainSection>
      <MainSection name="Visualizing data in product dashboards">
        <Box marginBottom={8} marginTop={-8} width="100%">
          <MainSection.Subsection
            description={`
        People may rely on a product dashboard to analyze and gain insights or to come up with a sales and advertising strategy. Regardless of the intent, the layout should be structured starting with the most significant and ending with the least significant details, depending on the viewer’s role. For example, a campaign manager might see a dashboard as follows:
        1. Show the significant details first. This is usually done with a chart or graph.
        2. Next, provide scannable details in a table, that can then be drilled into further if needed.
        3. End with secondary background information. Here, we often find a combination of tables, lists and smaller visualizations.
        `}
          />
          <Box maxWidth={960}>
            <Image
              alt="Desktop screen showing a dashboard with an overview graph, followed by a table, followed by more graphs."
              naturalHeight={2622}
              naturalWidth={2034}
              src="https://i.pinimg.com/originals/b8/19/60/b81960ace4721c2eccd43cd657b599e8.png"
            />
          </Box>
        </Box>
      </MainSection>

      <MainSection name="Resources">
        <MainSection.Subsection
          description={`
      - [Adobe Spectrum: Data visualization fundamentals](https://spectrum.adobe.com/page/data-visualization-fundamentals/)
      - [Shopify Polaris: Data visualizations](https://polaris.shopify.com/design/data-visualizations)
      - [Policyviz](https://policyviz.com/)
      - [Financial Times Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/FT4schools_RGS.pdf)
      `}
        />
      </MainSection>
    </Page>
  );
}
