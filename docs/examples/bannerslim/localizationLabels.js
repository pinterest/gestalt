// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box, DefaultLabelProvider } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        BannerSlim: {
          accessibilityDismissButtonLabel: 'Banner entlassen',
          iconAccessibilityLabelError: 'Fehler',
          iconAccessibilityLabelInfo: 'Informationen',
          iconAccessibilityLabelRecommendation: 'Recommendation',
          iconAccessibilityLabelWarning: 'Warnung',
          iconAccessibilityLabelSuccess: 'Erfolg',
        },
      }}
    >
      <Box alignItems="center" display="flex" height="100%" padding={8}>
        <BannerSlim
          dismissButton={{
            onDismiss: () => {},
          }}
          message="Idea Pins sind jetzt plattformübergreifend verfügbar."
          primaryAction={{
            accessibilityLabel: 'Beantragen Sie für betta Zugang zu Idea Pins',
            label: 'Zugang beantragen',
            onClick: () => {},
            role: 'button',
          }}
          type="info"
        />
      </Box>
    </DefaultLabelProvider>
  );
}
