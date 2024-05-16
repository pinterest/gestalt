import { ReactNode, useState } from 'react';
import { BannerCallout, Box } from 'gestalt';

const BASE_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?usp=pp_url&entry.847151274=';

type Props = {
  componentName: string;
};

export default function FeedbackBannerCallout({ componentName }: Props) {
  const [showCallout, setShowCallout] = useState(true);
  const link = `${BASE_LINK}${componentName}`;

  return (
    // @ts-expect-error - TS2322 - Type '{ children: false | Element; marginLeft: number; marginRight: number; }' is not assignable to type 'IntrinsicAttributes & Omit<BoxProps, "ref"> & RefAttributes<HTMLDivElement>'.
    <Box marginLeft={-1} marginRight={-1}>
      {showCallout && (
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {
              setShowCallout(!showCallout);
            },
          }}
          iconAccessibilityLabel="Info icon"
          message="Answer two quick questions to let the Gestalt team know what you think of our new standardized documentation format (now with design best practices!)"
          primaryAction={{
            label: 'Give feedback',
            accessibilityLabel: 'Give documentation feedback',
            href: link,
            target: 'blank',
            role: 'link',
          }}
          title="Got feedback?"
          type="info"
        />
      )}
    </Box>
  );
}
