// @flow strict
import { Box, Callout } from 'gestalt';
import React, { type Node } from 'react';

export default function FeedbackCallout(): Node {
  const [showCallout, setShowCallout] = React.useState(true);

  return (
    <Box marginLeft={-1} marginRight={-1}>
      {showCallout && (
        <Callout
          type="info"
          iconAccessibilityLabel="Info icon"
          title="Got feedback?"
          message="Answer two quick questions to let the Gestalt team know what you think of our new standardized documentation format (now with design best practices!)"
          primaryAction={{
            label: 'Give feedback',
            href: 'https://forms.gle/mi1A1hxYGG6V39AH9',
            target: 'blank',
          }}
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {
              setShowCallout(!showCallout);
            },
          }}
        />
      )}
    </Box>
  );
}
