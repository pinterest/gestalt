// @flow strict
import { type Node, useState } from 'react';
import { Box, Callout } from 'gestalt';
import LINKS from './LINK_REPOSITORY.js';

type Props = {|
  componentName: string,
|};

export default function FeedbackCallout({ componentName }: Props): Node {
  const [showCallout, setShowCallout] = useState(true);
  const link = `${LINKS.FEEDBACK_CALLOUT_BASE_URL}${componentName}`;

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
            accessibilityLabel: 'Give documentation feedback',
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
