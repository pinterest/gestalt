import { ReactNode } from 'react';
import { BannerSlim, Box, Image } from 'gestalt';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function FunnelChartsPage() {
  return (
    <Page hideSideNav title="Funnel charts">
      <PageHeader
        badge="connection"
        description={`Funnel charts visualize data that goes through linear, sequential stages. An example is showing a customer’s journey from visiting a page to adding to their cart to checking out. The diminishing size of the value helps us gauge how much customer drop-off there is throughout the entire journey.
`}
        name="Funnel charts"
        type="guidelines"
      />
      <Box maxWidth={892}>
        {' '}
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Funnel chart guidelines are still in development. More to come soon!"
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
          alt="An example of a funnel chart."
          naturalHeight={2676}
          naturalWidth={900}
          src="https://i.pinimg.com/originals/fe/d0/61/fed061e625097e89162d6ab142ffb788.png"
        />
      </Box>
    </Page>
  );
}
