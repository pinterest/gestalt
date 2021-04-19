// @flow strict
import { Box, Callout, Upsell } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        secondaryAction={{ href: 'pinterest.com/help', label: 'Learn more' }}
        type="info"
        title="A Title"
      />
      <Upsell
        message="Insert a clever upsell message here"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        secondaryAction={{ href: 'pinterest.com/help', label: 'Learn more' }}
        title="A Title"
      />
    </Box>
  );
}
