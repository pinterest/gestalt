import { ReactNode } from 'react';
import { Box, DefaultLabelProvider, TableOfContents } from 'gestalt';

export default function Example() {
  const { hash } = window.location;

  return (
    <DefaultLabelProvider
      labels={{
        // @ts-expect-error - TS2322 - Type '{ TableOfContents: { accessibilityLabel: string; }; }' is not assignable to type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }'.
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
