import { useRef, useState } from 'react';
import {
  Box,
  CompositeZIndex,
  DefaultLabelProvider,
  Dropdown,
  FixedZIndex,
  Flex,
  IconButton,
} from 'gestalt';

export default function CustomIconButtonPopoverExample() {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ Link: { accessibilityNewTabLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
          accessibilityDownloadLabel: 'Es lädt eine Datei herunter.',
        },
      }}
    >
      <Flex height="100%" justifyContent="center" width="100%">
        <Box margin={2}>
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRef}
            accessibilityControls="localization-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="Weitere Optionen"
            icon="arrow-down"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
            size="lg"
          />
        </Box>
      </Flex>

      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="localization-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            iconEnd="directional-arrow-right"
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'Hilfe anfordern', label: 'Hilfe anfordern' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            iconEnd="directional-arrow-right"
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
              label: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
            }}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            iconEnd="download"
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'Download CVS template', label: 'Laden Sie die CVS-Vorlage herunter' }}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            iconEnd="visit"
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'Open Google Sheets template',
              label: 'Öffnen Sie die Google Sheets-Vorlage',
            }}
          />
        </Dropdown>
      )}
    </DefaultLabelProvider>
  );
}
