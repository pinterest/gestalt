// @flow strict
import { type Node } from 'react';
import { Box, Image, SlimBanner } from 'gestalt';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';

export default function FunnelChartsPage(): Node {
  return (
    <Page title="Funnel charts" hideSideNav>
      <PageHeader
        name="Funnel charts"
        type="guidelines"
        badge="connection"
        description={`Funnel charts visualize data that goes through linear, sequential stages. An example is showing a customer’s journey from visiting a page to adding to their cart to checking out. The diminishing size of the value helps us gauge how much customer drop-off there is throughout the entire journey.
`}
      />
      <Box maxWidth={892}>
        {' '}
        <SlimBanner
          type="info"
          iconAccessibilityLabel="Info"
          message="Funnel chart guidelines are still in development. More to come soon!"
        />
      </Box>
      <Box
        maxWidth={892}
        maxHeight={300}
        borderStyle="sm"
        overflow="hidden"
        color="light"
        rounding={2}
        marginBottom={0}
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
