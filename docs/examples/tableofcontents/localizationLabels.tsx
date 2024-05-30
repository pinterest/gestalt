import { Box, DefaultLabelProvider, TableOfContents } from 'gestalt';

export default function Example() {
  const { hash } = window.location;

  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ TableOfContents: { accessibilityLabel: string; }; }' is missing the following properties from type 'DefaultLabelContextType': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 18 more'.
      labels={{
        TableOfContents: {
          accessibilityLabel: 'Table of contents',
        },
      }}
    >
      <Box display="flex" justifyContent="center" padding={8}>
        <TableOfContents title="Beförderungen">
          <TableOfContents.Item
            active={hash === '#active-coupons'}
            href="#active-coupons"
            label="Aktive Gutscheine"
          />
          <TableOfContents.Item
            active={hash === '#active-credits'}
            href="#active-credits"
            label="Aktive Kredite"
          />
          <TableOfContents.Item
            active={hash === '#offer-codes'}
            href="#offer-codes"
            label="Angebot Codes"
          />
        </TableOfContents>
      </Box>
    </DefaultLabelProvider>
  );
}
