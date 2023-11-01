// @flow strict
import { type Node } from 'react';
import { Box, Image, SlimBanner } from 'gestalt';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';

export default function ComboGraphsPage(): Node {
  return (
    <Page title="Combo graphs" hideSideNav>
      <PageHeader
        name="Combo graphs"
        type="guidelines"
        badge="comparisontrends"
        description={`Combo graphs combine a bar graph and a line graph. They are useful for seeing a trend over time while comparing values in a category.

For a working example, see the [Combo](/web/chartgraph#Combo) variant in the ChartGraph component.
`}
      />
      <Box maxWidth={892}>
        {' '}
        <SlimBanner
          type="info"
          iconAccessibilityLabel="Info"
          message="Combo graph guidelines are still in development. More to come soon!"
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
          alt="An example of a combo graph."
          naturalHeight={2676}
          naturalWidth={900}
          src="https://i.pinimg.com/originals/f7/65/d1/f765d1b6581b5e511979abc92db2988e.png"
        />
      </Box>
    </Page>
  );
}
