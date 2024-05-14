import { BannerSlim, Box, Image } from 'gestalt';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function ComboGraphsPage() {
  return (
    <Page hideSideNav title="Combo graphs">
      <PageHeader
        badge="comparisontrends"
        description={`Combo graphs combine a bar graph and a line graph. They are useful for seeing a trend over time while comparing values in a category.

For a working example, see the [Combo](/web/chartgraph#Combo) variant in the ChartGraph component.
`}
        name="Combo graphs"
        type="guidelines"
      />
      <Box maxWidth={892}>
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Combo graph guidelines are still in development. More to come soon!"
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
          alt="An example of a combo graph."
          naturalHeight={2676}
          naturalWidth={900}
          src="https://i.pinimg.com/originals/f7/65/d1/f765d1b6581b5e511979abc92db2988e.png"
        />
      </Box>
    </Page>
  );
}
