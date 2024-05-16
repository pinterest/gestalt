import { ReactNode } from 'react';
import { BannerUpsell, Box } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss this banner',
          onDismiss: () => {},
        }}
        message="Single line BannerUpsell with no title or call to action."
      />
    </Box>
  );
}
