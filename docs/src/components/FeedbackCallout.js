// @flow strict
import { Box, Callout } from 'gestalt';
import React, { type Node } from 'react';

const FeedbackCallout = (): Node => {
  const [showCallout, setShowCallout] = React.useState(true);

  return (
    <Box marginLeft={-1} marginRight={-1}>
      {showCallout && (
        <Callout
          type="info"
          iconAccessibilityLabel="Info icon"
          title="We'd love your feedback!"
          message="The Gestalt team has been working hard to extend our documentation to include design best practices, as well as create a standardized documentation format. Let us know what you think so far by filling out our survey."
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
};

export default FeedbackCallout;
