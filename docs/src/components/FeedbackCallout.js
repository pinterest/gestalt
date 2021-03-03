// @flow strict
import { Box, Callout } from 'gestalt';
import React, { type Node } from 'react';

type Props = {|
  link: string,
|};

export default function FeedbackCallout({ link }: Props): Node {
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
            href: link,
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
