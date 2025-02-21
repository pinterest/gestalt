import { ComponentProps, ReactElement, useRef } from 'react';
import {
  SEMA_SPACE_800,
  SEMA_SPACE_1200,
} from 'gestalt-design-tokens/dist/js/vr-theme/constants.es';
import DismissButton from './DismissButton';
import Footer from './Footer';
import HeaderSection from './HeaderSection';
import useIsWrappedContainer from './useIsWrappedContainer';
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

  const wrappedRef = useRef<null | HTMLDivElement>(null);
  const isWrapped = useIsWrappedContainer(wrappedRef, true);

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

          {dismissButton && <DismissButton dismissButton={dismissButton} size="sm" />}
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
          <HeaderSection
            fullWidth
            gap={6}
            iconAccessibilityLabel={iconAccessibilityLabel}
            iconSize={32}
            message={message}
            title={title}
            type={type}
          />

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
        <Box position="relative">
          <Flex height="100%" width="100%">
            <Flex.Item flex="grow" minWidth={isWrapped ? undefined : 0}>
              <HeaderSection
                fullWidth
                gap={6}
                iconAccessibilityLabel={iconAccessibilityLabel}
                iconSize={32}
                message={message}
                title={title}
                type={type}
              />
            </Flex.Item>

            {(primaryAction || secondaryAction) && (
              <Flex.Item ref={wrappedRef}>
                <Footer
                  buttonSize="lg"
                  fullHeight={isWrapped}
                  marginTop={isWrapped ? 6 : 0}
                  primaryAction={primaryAction}
                  secondaryAction={secondaryAction}
                  selfAlign="center" type={type} wrap={false}
                />
              </Flex.Item>
            )}
          </Flex>
        </Box>
        {dismissButton && <DismissButton dismissButton={dismissButton} />}
      </Box>
    </Box>
  );
}
