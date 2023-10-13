// @flow strict
import { type Node, useState } from 'react';
import { Box, Callout } from 'gestalt';

const BASE_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?usp=pp_url&entry.847151274=';

type Props = {
  componentName: string,
};

export default function FeedbackCallout({ componentName }: Props): Node {
  const [showCallout, setShowCallout] = useState(true);
  const link = `${BASE_LINK}${componentName}`;

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
            role: 'link',
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
