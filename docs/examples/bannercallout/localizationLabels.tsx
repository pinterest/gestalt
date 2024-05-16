import {ReactNode} from 'react';
import { BannerCallout, Box, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example() {
  return (
    (<DefaultLabelProvider
      labels={{
        BannerCallout: {
          accessibilityDismissButtonLabel: 'Banner entlassen.',
          iconAccessibilityLabelError: 'Fehler.',
          iconAccessibilityLabelInfo: 'Informationen.',
          iconAccessibilityLabelRecommendation: 'Empfehlung.',
          iconAccessibilityLabelWarning: 'Warnung.',
          iconAccessibilityLabelSuccess: 'Erfolg.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box paddingX={8} paddingY={8}>
          <BannerCallout
            dismissButton={{
              accessibilityLabel: 'Verwerfen Sie dieses Banner.',
              onDismiss: () => {},
            }}
            message="Bewerben Sie sich beim Verified Merchant Program"
            primaryAction={{
              accessibilityLabel: 'Loslegen: Verified Merchant Program',
              href: 'https://pinterest.com',
              label: 'Loslegen',
              target: 'blank',
              role: 'link',
            }}
            secondaryAction={{
              accessibilityLabel: 'Erfahren Sie mehr: Verified Merchant Program',
              href: 'https://pinterest.com',
              label: 'Erfahren Sie mehr',
              target: 'blank',
              role: 'link',
            }}
            title="Ihr Geschäftskonto wurde erstellt!"
            type="info"
          />
        </Box>
      </Flex>
    </DefaultLabelProvider>)
  );
}
