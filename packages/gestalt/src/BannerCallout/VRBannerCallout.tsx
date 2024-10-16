import { ComponentProps, ReactElement } from 'react';
import {
  SEMA_SPACE_800,
  SEMA_SPACE_1200,
} from 'gestalt-design-tokens/dist/js/vr-theme/constants.es';
import DismissButton from './DismissButton';
import Footer from './Footer';
import HeaderSection from './HeaderSection';
import Box from '../Box';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import Flex from '../Flex';
import MESSAGING_TYPE_ATTRIBUTES from '../MESSAGING_TYPE_ATTRIBUTES';

type Props = {
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
  iconAccessibilityLabel?: string;
  message: string | ReactElement;
  primaryAction?:
    | {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
      }
    | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
      };
  secondaryAction?:
    | {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
      }
    | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
      };
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  title?: string;
};

export default function BannerCallout({
  dismissButton,
  iconAccessibilityLabel,
  message,
  primaryAction,
  secondaryAction,
  type,
  title,
}: Props) {
  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

  const largePadding = isRtl
    ? { paddingRight: SEMA_SPACE_800, paddingLeft: SEMA_SPACE_1200 }
    : { paddingRight: SEMA_SPACE_1200, paddingLeft: SEMA_SPACE_800 };

  const backgroundColor = MESSAGING_TYPE_ATTRIBUTES[type]?.backgroundColor;

  return (
    <Box width="100%">
      {/*
            SM BREAKPOINT
      */}
      <Box
        borderStyle={type === 'default' ? 'sm' : undefined}
        color={backgroundColor}
        display="block"
        lgDisplay="none"
        padding={6}
        position="relative"
        rounding={4}
        smDisplay="none"
        width="100%"
      >
        <Flex direction="column" width="100%">
          <Flex.Item minWidth={0}>
            <HeaderSection
              gap={3}
              iconAccessibilityLabel={iconAccessibilityLabel}
              iconSize={24}
              marginBottom={primaryAction || secondaryAction ? 4 : undefined}
              message={message}
              title={title}
              type={type}
            />
          </Flex.Item>

          {(primaryAction || secondaryAction) && (
            <Footer
              buttonSize="md"
              checkWrapped
              marginTop={4}
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
              type={type}
            />
          )}

          {dismissButton && <DismissButton dismissButton={dismissButton} />}
        </Flex>
      </Box>
      {/*
            MD BREAKPOINT
      */}
      <Box
        borderStyle={type === 'default' ? 'sm' : undefined}
        color={backgroundColor}
        dangerouslySetInlineStyle={{ __style: largePadding }}
        display="none"
        lgDisplay="none"
        paddingY={8}
        position="relative"
        rounding={4}
        smDisplay="block"
        width="100%"
      >
        <Flex direction="column" width="100%">
          <Flex.Item minWidth={0}>
            <HeaderSection
              gap={6}
              iconAccessibilityLabel={iconAccessibilityLabel}
              iconSize={32}
              message={message}
              title={title}
              type={type}
            />
          </Flex.Item>

          {(primaryAction || secondaryAction) && (
            <Flex.Item flex="grow">
              <Footer
                buttonSize="lg"
                marginTop={6}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                type={type}
              />
            </Flex.Item>
          )}

          {dismissButton && <DismissButton dismissButton={dismissButton} />}
        </Flex>
      </Box>
      {/*
            LG BREAKPOINT
      */}
      <Box
        borderStyle={type === 'default' ? 'sm' : undefined}
        color={backgroundColor}
        dangerouslySetInlineStyle={{ __style: largePadding }}
        display="none"
        lgDisplay="block"
        paddingY={8}
        position="relative"
        rounding={4}
        smDisplay="none"
        width="100%"
      >
        <Flex alignItems="center" width="100%" wrap>
          <Flex.Item minWidth={0}>
            <HeaderSection
              gap={6}
              iconAccessibilityLabel={iconAccessibilityLabel}
              iconSize={32}
              message={message}
              title={title}
              type={type}
            />
          </Flex.Item>

          {(primaryAction || secondaryAction) && (
            <Flex.Item flex="grow">
              <Footer
                buttonSize="lg"
                marginTop={0}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                type={type}
              />
            </Flex.Item>
          )}

          {dismissButton && <DismissButton dismissButton={dismissButton} />}
        </Flex>
      </Box>
    </Box>
  );
}
