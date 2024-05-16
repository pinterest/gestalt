import {ReactNode} from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerSlim
        iconAccessibilityLabel="Information"
        message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
        primaryAction={{
          accessibilityLabel: 'Learn more about campaign budget optimization',
          label: 'Learn more',
          onClick: () => {},
          role: 'button',
        }}
        type="info"
      />
    </Box>
  );
}
