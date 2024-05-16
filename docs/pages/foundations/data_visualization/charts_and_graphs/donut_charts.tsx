import { ReactNode } from 'react';
import { BannerSlim, Box, Image } from 'gestalt';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function DonutChartsPage() {
  return (
    <Page hideSideNav title="Donut charts">
      <PageHeader
        badge="partstowhole"
        description={`Donuts are a quick way to see parts of a whole as percentages. An example is breaking up an audience by gender.
`}
        name="Donut charts"
        type="guidelines"
      />
      <Box maxWidth={892}>
        {' '}
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Donut chart guidelines are still in development. More to come soon!"
          type="info"
        />
      </Box>
      <Box
        borderStyle="sm"
        color="light"
        marginBottom={0}
        maxHeight={300}
        maxWidth={892}
        overflow="hidden"
        rounding={2}
      >
        <Image
          alt="An example of a donut chart."
          naturalHeight={2676}
          naturalWidth={900}
          src="https://i.pinimg.com/originals/c3/43/cc/c343cc8a194f62ccea1cf51f37677463.png"
        />
      </Box>
      <Box maxWidth={892}>
        {' '}
        <BannerSlim
          iconAccessibilityLabel="Warning"
          message="Use donuts and pie charts only with 2–3 categories and percentage values as they can easily become hard to read. Donut charts aren’t good for conveying more complex information and allowing you to drill down; a [bar graph](bar_graphs) is better."
          type="warningBare"
        />
      </Box>
    </Page>
  );
}
