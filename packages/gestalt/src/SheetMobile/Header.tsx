import { type ComponentProps, Fragment, type ReactNode, useEffect, useRef } from 'react';
import PrimaryAction from './PrimaryAction';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import Box from '../Box';
import type Button from '../Button';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import Heading from '../Heading';
import IconButton from '../IconButton';
import type Link from '../Link';
import InternalDismissButton from '../sharedSubcomponents/InternalDismissButton';
import TapArea from '../TapArea';
import Text from '../Text';

type OnClickType = (arg1: {
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.KeyboardEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>;
  onDismissStart: () => void;
}) => void;

type Props = {
  accessibilityLabel?: string;
  align: 'start' | 'center';
  backIconButton:
    | {
        accessibilityLabel: string;
        onClick: OnClickType;
      }
    | null
    | undefined;
  forwardIconButton:
    | {
        accessibilityLabel: string;
        onClick: OnClickType;
      }
    | null
    | undefined;
  heading: ReactNode;
  id: string;
  onDismiss?: () => void;
  primaryAction:
    | {
        accessibilityLabel: string;
        href?: string;
        label: string;
        onClick: OnClickType;
        rel?: ComponentProps<typeof Link>['rel'];
        size?: ComponentProps<typeof Button>['size'];
        target?: ComponentProps<typeof Link>['target'];
      }
    | null
    | undefined;
  showDismissButton: boolean | null | undefined;
  showGrabber?: boolean;
  subHeading: string | null | undefined;
};

export default function Header({
  backIconButton,
  id,
  showDismissButton,
  heading,
  subHeading,
  forwardIconButton,
  onDismiss,
  primaryAction,
  showGrabber,
  align,
}: Props) {
  const { accessibilityDismissButtonLabel, accessibilityGrabberLabel } =
    useDefaultLabelContext('SheetMobile');
  const { onExternalDismiss } = useRequestAnimationFrame();

  const dismissButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const grabberRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  useEffect(() => {
    if (!showGrabber && dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }

    if (grabberRef.current) {
      grabberRef.current.focus();
    }
  }, [dismissButtonRef, showGrabber]);

  return (
    <Fragment>
      {showGrabber ? (
        <Flex justifyContent="center">
          <Box marginBottom={2}>
            <TapArea
              // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLDivElement | HTMLAnchorElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
              ref={grabberRef}
              accessibilityLabel={accessibilityGrabberLabel}
              fullWidth={false}
              rounding={7}
            >
              <Box color="secondary" height={5} rounding={7} width={37} />
            </TapArea>
          </Box>
        </Flex>
      ) : null}
      <Flex alignItems="center" gap={4} justifyContent="center">
        {backIconButton ? (
          <Flex.Item flex="none">
            <IconButton
              accessibilityLabel={backIconButton.accessibilityLabel}
              icon="arrow-back"
              iconColor="darkGray"
              onClick={({ event }) =>
                backIconButton?.onClick({
                  event,
                  onDismissStart: onExternalDismiss,
                })
              }
              size="lg"
            />
          </Flex.Item>
        ) : null}
        {!backIconButton && showDismissButton ? (
          <Flex.Item flex="none">
            <InternalDismissButton
              // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
              ref={dismissButtonRef}
              accessibilityControls={id}
              accessibilityLabel={accessibilityDismissButtonLabel}
              onClick={onDismiss ?? onExternalDismiss}
              size="lg"
            />
          </Flex.Item>
        ) : null}
        <Flex.Item flex="grow">
          {/* Flex.Item must wrap the conditional to prevent the DismissButton from being centered if there's no heading */}
          {heading ? (
            <Flex direction="column">
              {typeof heading === 'string' ? (
                <Heading accessibilityLevel={1} align={align} lineClamp={2} size="300">
                  {heading}
                </Heading>
              ) : (
                heading
              )}
              {subHeading && (
                <Text align={align} size="100">
                  {subHeading}
                </Text>
              )}
            </Flex>
          ) : null}
        </Flex.Item>
        {forwardIconButton && !primaryAction ? (
          <Flex.Item flex="none">
            <IconButton
              accessibilityLabel={forwardIconButton.accessibilityLabel}
              icon="arrow-forward"
              iconColor="darkGray"
              onClick={({ event }) =>
                forwardIconButton?.onClick({
                  event,
                  onDismissStart: onExternalDismiss,
                })
              }
              size="lg"
            />
          </Flex.Item>
        ) : null}
        {primaryAction ? (
          // Allow button text to wrap on mobile
          <Flex.Item flex="shrink">
            {primaryAction.href ? (
              <PrimaryAction
                accessibilityLabel={primaryAction.accessibilityLabel}
                href={primaryAction.href}
                label={primaryAction.label}
                onClick={({ event }) =>
                  primaryAction?.onClick({
                    event,
                    onDismissStart: onExternalDismiss,
                  })
                }
                rel={primaryAction.rel}
                role="link"
                target={primaryAction?.target}
              />
            ) : (
              <PrimaryAction
                accessibilityLabel={primaryAction.accessibilityLabel}
                label={primaryAction.label}
                onClick={({ event }) =>
                  primaryAction?.onClick({
                    event,
                    onDismissStart: onExternalDismiss,
                  })
                }
                role="button"
              />
            )}
          </Flex.Item>
        ) : null}
      </Flex>
    </Fragment>
  );
}
