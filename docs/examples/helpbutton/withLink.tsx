import { ReactNode } from 'react';
import { Flex, HelpButton, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={1} height="100%" justifyContent="center">
      <Text>This is Gestalt</Text>
      <HelpButton
        accessibilityLabel="Click to learn more about gestalt"
        accessibilityPopoverLabel="Expanded information about Gestalt"
        link={{
          href: 'https://gestalt.pinterest.systems/',
          // @ts-expect-error - TS2322 - Type '{ href: string; text: string; accessibilityLabel: string; }' is not assignable to type '{ accessibilityLabel?: string | undefined; externalLinkIcon?: "none" | "default" | { color: "warning" | "info" | "error" | "brandPrimary" | "default" | "subtle" | "success" | "shopping" | ... 4 more ... | undefined; size: string | ... 1 more ... | undefined; } | undefined; href: string; onClick?: AbstractEventHandle...'.
          text: 'Read our documentation',
          accessibilityLabel: 'Visit Gestalt portal',
        }}
        text="Gestalt is Pinterest's design system."
      />
    </Flex>
  );
}
