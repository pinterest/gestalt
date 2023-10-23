// @flow strict
import { type Node } from 'react';
import { Box, DefaultLabelProvider, SlimBanner } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Slimbanner: {
          accessibilityDismissButtonLabel: 'Banner entlassen',
          iconAccessibilityLabelError: 'Fehler',
          iconAccessibilityLabelInfo: 'Informationen',
          iconAccessibilityLabelRecommendation: 'Recommendation',
          iconAccessibilityLabelWarning: 'Warnung',
          iconAccessibilityLabelSuccess: 'Erfolg',
        },
      }}
    >
      <Box padding={8} height="100%" display="flex" alignItems="center">
        <SlimBanner
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
